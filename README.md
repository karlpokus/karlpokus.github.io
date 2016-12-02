So.. *how simple can I make it?* Github demands that all data at [username].github.io be static content. So I figured I make a blogging tool with static pages and posts. Sounds like fun. Well here it is. Note: server-side-rendered pages loads *fast* which is nice.

# features
- Builds [n] pages from posts
- sorts posts by `mtime`
- parses markdown to html
- adds pagination to pages
- assets from /assets

# 1.0 usage
```bash
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
- [x] maybe checkout [hexo](https://hexo.io/) *nope*
- [ ] gulp?
- [ ] permalink? Requires (1) filename match post title, (2) generate each post in /post and (3) make h1 clickable to /post/[post]
- [ ] 2.0 - release the blogging tool as a module on npm - *static pages with markdown*

# 2.0 api
bash
```bash
# setup
$ npm i app -g
$ mkdir assets posts public # ..and the html somehow
$ echo "#first post" > posts/firstpost.md
# build
$ app -b [-n postsPerPage]
# run a test server
$ app -s [-p port]
# Search posts - title or content
$ ls posts/ | grep -i [word]
$ grep -i [word] posts/* --color
# 5 latest post
$ ls -t | head -n 5
```

node
```bash
# install
$ npm i app -g
# init (Creates folders and whatnot)
$ app -i
# new post
$ app -p title
# build
$ app -b [-n postsPerPage]
# run a test server
$ app -s [-p port]
# build and test
$ app -t [-n postsPerPage] [-p port]
# search posts
$ app -f word
```

# licence
?
