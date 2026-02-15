.PHONY: dev-release

dev-release:
	git checkout master
	git merge dev
	git push
	git checkout dev
