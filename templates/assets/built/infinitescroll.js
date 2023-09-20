$(function ($) {
  var currentPage = 1;
  var pathname = window.location.pathname;
  var $document = $(document);
  var $result = $(".post-feed");
  var buffer = 300;
  var ticking = false;
  var isLoading = false;
  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = $document.height();
  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }
  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = $document.height();
    requestTick();
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(infiniteScroll);
    }
    ticking = true;
  }
  function sanitizePathname(path) {
    var paginationRegex = /(?:page\/)(\d)(?:\/)$/i;
    path = path.replace(/#(.*)$/g, "").replace("////g", "/");
    if (path.match(paginationRegex)) {
      currentPage = parseInt(path.match(paginationRegex)[1]);
      path = path.replace(paginationRegex, "");
    }
    return path;
  }
  function infiniteScroll() {
    pathname = sanitizePathname(pathname);
    if (isLoading) {
      return;
    }
    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false;
      return;
    }
    if (currentPage >= maxPages) {
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("resize", onResize);
      return;
    }
    isLoading = true;
    currentPage += 1;
    if (pathname.charAt(pathname.length - 1) != "/") {
      pathname = pathname + "/";
    }
    var nextPage = pathname + "page/" + currentPage;
    console.log(pathname);
    console.log(nextPage, 1111);
    $.get(nextPage, function (content) {
      var parse = document.createRange().createContextualFragment(content);
      var posts = parse.querySelectorAll(".post");
      if (posts.length) {
        [].forEach.call(posts, function (post) {
          $result[0].appendChild(post);
        });
      }
    })
      .fail(function (xhr) {
        if (xhr.status === 404) {
          window.removeEventListener("scroll", onScroll, { passive: true });
          window.removeEventListener("resize", onResize);
        }
      })
      .always(function () {
        lastDocumentHeight = $document.height();
        isLoading = false;
        ticking = false;
      });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  infiniteScroll();
});
$(function ($) {
  var currentPage = 1;
  var pathname = window.location.pathname;
  var $document = $(document);
  var $result = $(".post-feed");
  var buffer = 300;
  var ticking = false;
  var isLoading = false;
  var lastScrollY = window.scrollY;
  var lastWindowHeight = window.innerHeight;
  var lastDocumentHeight = $document.height();
  function onScroll() {
    lastScrollY = window.scrollY;
    requestTick();
  }
  function onResize() {
    lastWindowHeight = window.innerHeight;
    lastDocumentHeight = $document.height();
    requestTick();
  }
  function requestTick() {
    if (!ticking) {
      requestAnimationFrame(infiniteScroll);
    }
    ticking = true;
  }
  function sanitizePathname(path) {
    var paginationRegex = /(?:page\/)(\d)(?:\/)$/i;
    path = path.replace(/#(.*)$/g, "").replace("////g", "/");
    if (path.match(paginationRegex)) {
      currentPage = parseInt(path.match(paginationRegex)[1]);
      path = path.replace(paginationRegex, "");
    }
    return path;
  }
  function infiniteScroll() {
    pathname = sanitizePathname(pathname);
    if (isLoading) {
      return;
    }
    if (lastScrollY + lastWindowHeight <= lastDocumentHeight - buffer) {
      ticking = false;
      return;
    }
    if (currentPage >= maxPages) {
      window.removeEventListener("scroll", onScroll, { passive: true });
      window.removeEventListener("resize", onResize);
      return;
    }
    isLoading = true;
    currentPage += 1;
    if (pathname.charAt(pathname.length - 1) != "/") {
      pathname = pathname + "/";
    }
    var nextPage = pathname + "page/" + currentPage;
    console.log(pathname);
    console.log(nextPage, 1111);
    $.get(nextPage, function (content) {
      var parse = document.createRange().createContextualFragment(content);
      var posts = parse.querySelectorAll(".post");
      if (posts.length) {
        [].forEach.call(posts, function (post) {
          $result[0].appendChild(post);
        });
      }
    })
      .fail(function (xhr) {
        if (xhr.status === 404) {
          window.removeEventListener("scroll", onScroll, { passive: true });
          window.removeEventListener("resize", onResize);
        }
      })
      .always(function () {
        lastDocumentHeight = $document.height();
        isLoading = false;
        ticking = false;
      });
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onResize);
  infiniteScroll();
});
