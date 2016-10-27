bin := node_modules/.bin/

all: compile

compile:
	@$(bin)babel src --extensions .mjs,.jsx --source-maps both --out-dir src
	@$(bin)babel test --extensions .mjs,.jsx --source-maps both --out-dir test
	@$(bin)stylus --sourcemap --sourcemap-base src/renderer src/**

lint:
	@$(bin)eslint --ext .mjs,.jsx src test

test: compile
	@$(bin)mocha

# Delete all the .js and .js.map files (excluding any potential dotfiles with .js extension)
distclean:
	@find . \
		\( \
			-name '*.js' \
			-or -name '*.js.map' \
			-or -name '*.css' \
			-or -name '*.css.map' \
		\) \
		-not -path './node_modules/*' \
		-not -name '.*.js' \
		-print -delete

.PHONY: compile lint test distclean
