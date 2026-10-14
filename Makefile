# Shortcuts for the npm scripts. Run `make` (or `make help`) to list them.
# Needs GNU make (Windows: Git Bash, WSL, or `choco install make`).
#
# Nothing is passed in: every site and every option is its own command.
#   make rookies-status                  status of every chapter on rookies.vn
#   make rookies-queue-all               queue every allowed chapter
#   make rookies-queue-range-1-5         queue chapters 1 to 5
#   make rookies-queue-draft-range-1-5   same, but save them as drafts
#   make rookies-pull-only-den-vang      write one chapter (by web address) to convert
#
# The value inside a command name is the part after "range-" or "only-":
#   range-1-5     chapters 1 to 5          range-5-   from chapter 5 on
#   range-1-3,8   chapters 1 to 3 and 8    (no spaces; commas are fine)
#   only-<slug>   one chapter by web address, e.g. only-bao-giay-vun
#
# Typical flow for a site:
#   make rookies-pull-range-1-5       # writes files in crosspost/work/rookies/
#   (Claude converts them following crosspost/sites/rookies/convert.md)
#   make rookies-check                # check the conversions and save them
#   make rookies-queue-range-1-5      # or queue from /admin/crosspost
#   make rookies-worker               # leave running; it posts the queue
#   make rookies-status               # posted, outdated, waiting...
#
# Preview any command without running it:  make -n rookies-queue-all
#
# Not available as commands (use `npm run crosspost -- ...` directly, see
# crosspost/cli.mjs): --no-interludes and --any.
#
# ADDING A SITE: create crosspost/sites/<site>/, then add its name to SITES below.

SITES := rookies

.DEFAULT_GOAL := help
.PHONY: help install dev build preview check test crosspost-setup \
	import import-dry import-draft import-overwrite import-reorder export \
	translations translations-dry chats chats-dry blocks blocks-dry

help: ## Show this list
	@grep -E '^[a-zA-Z_-]+:.*## ' $(MAKEFILE_LIST) | awk 'BEGIN {FS = ":.*## "} {printf "  %-20s %s\n", $$1, $$2}'
	@$(foreach s,$(SITES),$(call site_help,$(s)))

install: ## Install dependencies
	npm install

dev: ## Start the dev server
	npm run dev

build: ## Build the site
	npm run build

preview: ## Preview the production build
	npm run preview

check: ## Type-check (astro check)
	npm run check

test: ## Run the tests
	npm test

# ───────────── Chapter files and database ─────────────

import: ## Import content/import/*.md (published, existing chapters skipped)
	npm run import

import-dry: ## Show what import would do, change nothing
	npm run import -- --dry-run

import-draft: ## Import as drafts
	npm run import -- --draft

import-overwrite: ## Import and replace chapters that already exist
	npm run import -- --overwrite

import-reorder: ## Import and put chapters in file-name order
	npm run import -- --reorder

export: ## Export all chapters to backup/chapters
	npm run export

translations: ## Mark translations in content/import
	npm run translations

translations-dry: ## Show what translations would change
	npm run translations -- --dry-run

chats: ## Turn text-message passages into chat blocks
	npm run chats

chats-dry: ## Show what chats would change
	npm run chats -- --dry-run

blocks: ## Apply the other block edits
	npm run blocks

blocks-dry: ## Show what blocks would change
	npm run blocks -- --dry-run

# ───────────── Cross-posting (see README) ─────────────

crosspost-setup: ## One-time: install Playwright for the worker
	npm run crosspost:setup

# One set of commands per site in SITES.
define site_help
	@echo
	@echo "  $(1)-status  $(1)-status-range-1-5  $(1)-status-only-<slug>"
	@echo "  $(1)-pull-all  $(1)-pull-all-force  $(1)-pull-range-1-5  $(1)-pull-only-<slug>"
	@echo "  $(1)-check  $(1)-cancel  $(1)-login  $(1)-worker  $(1)-worker-once"
	@echo "  $(1)-queue-all  $(1)-queue-range-1-5  $(1)-queue-only-<slug>"
	@echo "  $(1)-queue-draft-all  $(1)-queue-draft-range-1-5  $(1)-queue-draft-only-<slug>"
endef

define site_commands
.PHONY: $(1)-status $(1)-pull-all $(1)-pull-all-force $(1)-check $(1)-cancel $(1)-login $(1)-worker $(1)-worker-once \
	$(1)-queue-all $(1)-queue-draft-all

$(1)-status:
	npm run crosspost -- status $(1)
$(1)-status-range-%:
	npm run crosspost -- status $(1) --range $$*
$(1)-status-only-%:
	npm run crosspost -- status $(1) --only $$*

$(1)-pull-all:
	npm run crosspost -- pull $(1) --all
$(1)-pull-all-force:
	npm run crosspost -- pull $(1) --all --force
$(1)-pull-range-%:
	npm run crosspost -- pull $(1) --range $$*
$(1)-pull-only-%:
	npm run crosspost -- pull $(1) --only $$*

$(1)-check:
	npm run crosspost -- check $(1) --save

$(1)-queue-all:
	npm run crosspost -- queue $(1) --all --publish
$(1)-queue-range-%:
	npm run crosspost -- queue $(1) --range $$* --publish
$(1)-queue-only-%:
	npm run crosspost -- queue $(1) --only $$* --publish
$(1)-queue-draft-all:
	npm run crosspost -- queue $(1) --all --draft
$(1)-queue-draft-range-%:
	npm run crosspost -- queue $(1) --range $$* --draft
$(1)-queue-draft-only-%:
	npm run crosspost -- queue $(1) --only $$* --draft

$(1)-cancel:
	npm run crosspost -- cancel $(1)
$(1)-login:
	npm run crosspost -- login $(1)
$(1)-worker:
	npm run crosspost -- worker $(1)
$(1)-worker-once:
	npm run crosspost -- worker $(1) --once
endef

$(foreach s,$(SITES),$(eval $(call site_commands,$(s))))
