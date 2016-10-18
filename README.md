The simplest blogging tool I can make under these constraints. *Everything* is pre-rendered per github rules. The content is all about automation. A work in progress.

# build
```
$ node build.js -n [posts per page]
```

# features
- SSR
- n posts @ /
- next n posts @ /public/page[n].html

# todos
- [x] get n posts
- [x] sort posts by date
- [x] parse markdown
- [x] build page(s)
- [ ] add hash to url on title click
- [ ] build paginator
- [x] remove old files before build
