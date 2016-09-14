bin := node_modules/.bin/

all: compile

compile:
	@$(bin)babel src --extensions .es --source-maps both --out-dir src
	@$(bin)babel test --extensions .es --source-maps both --out-dir test

lint:
	@$(bin)eslint --ext .es src test

test: compile
	@$(bin)mocha

# Delete all the .js and .js.map files (excluding any potential dotfiles with .js extension)
distclean:
	@find . \( -name '*.js' -or -name '*.js.map' \) \
		-not -path './node_modules/*' \
		-not -name '.*.js' \
		-print -delete

.PHONY: compile lint test distclean
