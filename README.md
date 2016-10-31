The simplest blogging tool I can make under the constraints. *Everything* is static files, so pre-rendered per github rules. The content is all about automation. A work in progress.

# usage
```
# new post
$ npm run post -- post title with spaces
# build
$ npm run build [-- -n posts per page]
# run test server
$ npm run server [-- -p port]
# build and test
$ npm test
```

# features
- index with n posts @ /
- page[n] with next n posts @ /public/page[n].html
- assets @ /assets

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
- [ ] permalink from post title - requires parsing markdown on the client and filename to be title
- [ ] maybe checkout [hexo](https://hexo.io/)
