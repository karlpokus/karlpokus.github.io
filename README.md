The simplest blogging tool I can make under the constraints. *Everything* is pre-rendered per github rules. The content is all about automation. A work in progress.

# build && test
```
$ npm run build [-- -n posts per page]
$ npm test [-- -p port]
```

# features
- n posts @ /
- next n posts @ /public/page[n].html

# todos
- [x] get n posts
- [x] sort posts by date
- [x] parse markdown
- [x] build page(s)
- [x] add hash to url on click title (nope - won't work)
- [x] build paginator
- [x] images in markdown
- [x] remove old files before build
- [x] test server
- [x] put css in head style
- [x] 404 (nevermind - github won't use it)
- [x] padding between posts
