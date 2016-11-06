So this is really an exercise in frugailty as in - *how simple can I make it?* Github demands that all data at [username].github.io be static content. So I figured I make a blogging tool with static pages and posts. Sounds like fun. Well here it is.

Note: server-side-rendered pages loads *fast* which is nice.

# features
- Builds [n] pages from posts
- sorts posts by `mtime`
- parses markdown to html
- pagination
- assets from /assets

# usage
```
# new post
$ npm run post -- post title with spaces

# search posts
$ npm run find -- word

# build
$ npm run build [-- -n posts per page]

# run test server
$ npm run server [-- -p port]

# build and test
$ npm test
```

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
