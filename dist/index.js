// Generated by CoffeeScript 1.12.7
(function() {
  var idNr,
    slice = [].slice;

  idNr = 1;

  this.GetShare = (function() {
    function GetShare(options) {
      var base, base1, base2, gs, key, network, ref, ref1, ref10, ref11, ref12, ref2, ref3, ref4, ref5, ref6, ref7, ref8, ref9, rootId, value;
      gs = this;
      network = this.getNetworkDefaults((options != null ? options.network : void 0) || "");
      this.extend(this, {
        autoInit: true,
        popover: {
          width: "300px",
          height: "100px",
          position: "bottom right",
          attr: {
            "class": "getshare-popover"
          }
        },
        attr: {
          "id": "getshare-" + (idNr++),
          "class": "getshare"
        },
        button: {
          icon: {
            style: {
              "margin": "1px 2px",
              "height": "14px",
              "max-width": "12px"
            }
          },
          attr: {
            "class": "getshare-button"
          }
        },
        counter: {
          mode: "countUp",
          position: "inside",
          loader: "spinner",
          count: 0,
          countLoaded: false,
          attr: {
            "class": "getshare-counter"
          }
        }
      }, network, options);
      if (this.network === "vk") {
        window.VK = {};
        window.VK.Share = {};
        window.VK.Share.count = $.proxy(function(a, count) {
          return gs.counter.count = count;
        }, this);
      }
      (base = this.button.attr).href || (base.href = "");
      (base1 = this.counter).query || (base1.query = {});
      (base2 = this.counter.query).url || (base2.url = "");
      if (this.root == null) {
        rootId = "root-" + this.attr.id;
        document.write("<span id=\"" + rootId + "\"/>");
        this.root = $("#" + rootId);
      }
      this.elem = jQuery("<span></span>");
      this.switchElem = jQuery("<input type=\"checkbox\" id=\"cb-" + this.attr.id + "\"/>");
      this.elem.append(this.switchElem);
      this.switchElem.change(function() {
        var $popover, $this, checked, left, target, top, win;
        target = gs.popover.target || gs.attr.id;
        $this = jQuery(this);
        checked = $this.is(":checked");
        jQuery(".getshare input[type=checkbox]").attr("checked", false);
        if (checked && (gs.popover.content != null)) {
          $this.attr("checked", true);
          $popover = $("#" + gs.attr.id + " ." + gs.popover.attr["class"] + " > div");
          if ($popover.length <= 1) {
            $popover = gs.popover.elem.find("div");
          }
          return $popover.html(gs.replaceString(gs.popover.content));
        } else if (gs.popover.url != null) {
          left = (screen.width / 2) - (gs.popover.width / 2);
          top = (screen.height / 2) - (gs.popover.height / 2);
          options = "menubar=1,resizable=1,width=" + gs.popover.width + ",height=" + gs.popover.height + ",top=" + top + ",left=" + left;
          if (gs.popover.options === false) {
            options = null;
          }
          win = window.open(gs.replaceString(gs.popover.url), target, options);
          return win.focus();
        }
      });
      this.button.elem = jQuery("<label for=\"cb-" + this.attr.id + "\"/>");
      this.counter.elem = jQuery("<span/>");
      ref = this.attr || {};
      for (key in ref) {
        value = ref[key];
        this.elem.attr(key, value);
      }
      ref2 = ((ref1 = this.button) != null ? ref1.attr : void 0) || {};
      for (key in ref2) {
        value = ref2[key];
        this.button.elem.attr(key, value);
      }
      ref4 = ((ref3 = this.counter) != null ? ref3.attr : void 0) || {};
      for (key in ref4) {
        value = ref4[key];
        this.counter.elem.attr(key, value);
      }
      if (((ref5 = this.button) != null ? ref5.icon : void 0) != null) {
        this.button.elem.addClass("getshare-icon");
      }
      if (this.network != null) {
        this.button.elem.addClass("getshare-button-" + this.network);
      }
      if (((ref6 = this.button) != null ? ref6.text : void 0) != null) {
        this.button.elem.append("<span class=\"getshare-text\">" + this.button.text + "</span>");
      }
      this.elem.append(this.button.elem);
      if (((ref7 = this.counter) != null ? ref7.mode : void 0) === "count" || ((ref8 = this.counter) != null ? ref8.mode : void 0) === "countUp" || ((ref9 = this.counter) != null ? ref9.mode : void 0) === "amount" || ((ref10 = this.counter) != null ? ref10.mode : void 0) === "amountUp") {
        if (this.counter.position === "splitBorder") {
          this.counter.position = "split border";
        }
        this.counter.elem.addClass(this.counter.position);
        if (this.counter.position === "bubble") {
          this.elem.append(this.counter.elem);
        } else {
          this.button.elem.append(this.counter.elem);
        }
      }
      if (gs.popover.content != null) {
        this.popover.elem = jQuery("<div>\n  <label for=\"cb-" + this.attr.id + "\">✖</label>\n  <div/>\n</div>");
        ref12 = ((ref11 = this.popover) != null ? ref11.attr : void 0) || {};
        for (key in ref12) {
          value = ref12[key];
          this.popover.elem.attr(key, value);
        }
        this.popover.elem.addClass(this.popover.position);
        this.popover.elem.css("width", this.popover.width);
        this.popover.elem.css("height", this.popover.height);
        this.popover.elem.css("top", "-" + this.popover.height);
        this.elem.append(this.popover.elem);
      }
      this.root.append(this.elem);
      if (this.autoInit) {
        this.setUrl(this.share.url);
      }
    }

    GetShare.prototype.encode = function(str) {
      if (str == null) {
        return "";
      }
      return encodeURIComponent(str.toString()).replace(/'/g, "%27").replace(/"/g, "%22");
    };

    GetShare.prototype.setUrl = function(url, callback) {
      var gs;
      gs = this;
      this.share || (this.share = {});
      this.share.url = url || window.location.href;
      if (this.share.url.length > 8 && this.share.url.substr(8).indexOf("/") < 0) {
        this.share.url += "/";
      }
      this.share.encUrl = this.encode(this.share.url);
      this.share.encMessage = this.encode(this.share.message);
      this.share.encImageUrl = this.encode(this.share.imageUrl);
      this.counter.query.encUrl = this.replaceString(this.counter.query.url);
      this.button.elem.attr("href", this.replaceString(this.button.attr.href));
      if ((url != null) && this.network === "weibo" && url.indexOf("https://t.cn") === -1) {
        this.counter.query.encUrlShortener = this.replaceString(this.counter.query.urlShortener);
        $.getJSON(this.counter.query.encUrlShortener, function(res) {
          var ref, ref1;
          if ((res != null ? (ref = res.data) != null ? (ref1 = ref.urls) != null ? ref1[0].url_short : void 0 : void 0 : void 0) != null) {
            return gs.setUrl(res.data.urls[0].url_short, callback);
          } else {
            gs.counter.count = 404;
            return gs.updateCounterHtml();
          }
        });
        return;
      }
      return this.getCount(function(elem) {
        gs.updateCounterHtml();
        if (callback) {
          return $.proxy(callback, gs)(elem);
        }
      });
    };

    GetShare.prototype.extend = function() {
      var elements, i, len, src, srcKey, srcVal, target;
      target = arguments[0], elements = 2 <= arguments.length ? slice.call(arguments, 1) : [];
      target || (target = {});
      for (i = 0, len = elements.length; i < len; i++) {
        src = elements[i];
        for (srcKey in src) {
          srcVal = src[srcKey];
          if (typeof srcVal === "object" && (srcVal != null) && (srcVal.length == null)) {
            target[srcKey] || (target[srcKey] = {});
            this.extend(target[srcKey], srcVal);
          } else {
            target[srcKey] = srcVal;
          }
        }
      }
      return target;
    };

    GetShare.prototype.updateCounterHtml = function() {
      var $counter, gs;
      gs = this;
      $counter = $("#" + this.attr.id + " ." + this.counter.attr["class"]);
      if ($counter.length <= 1) {
        $counter = this.counter.elem;
      }
      $counter.removeClass("getshare-loader");
      return $counter.html(this.convertCount(this.counter.count));
    };

    GetShare.prototype.getCount = function(callback) {
      var gs;
      gs = this;
      this.counter.elem.html("");
      this.counter.elem.addClass("getshare-loader");
      return $.getJSON(this.counter.query.encUrl, function(res) {
        var count, ref, ref1;
        if (res != null) {
          count = gs.extractCount(res, (((ref = gs.counter) != null ? (ref1 = ref.query) != null ? ref1.path : void 0 : void 0) || "").split("."));
        }
        if (count == null) {
          count = 0;
        }
        if (isNaN(count)) {
          count = 0;
        }
        gs.counter.count = count;
        if (callback != null) {
          return $.proxy(callback, gs)(res);
        }
      }).fail(function() {
        if (callback != null) {
          return $.proxy(callback, gs)();
        }
      });
    };

    GetShare.prototype.extractCount = function(item, query) {
      var count, field, i, len, subItem;
      count = 0;
      if ((item != null) && (query != null)) {
        if ($.isArray(item)) {
          for (i = 0, len = item.length; i < len; i++) {
            subItem = item[i];
            count += this.extractCount(subItem, query.slice());
          }
        } else if ($.isNumeric(item)) {
          count = item * 1;
        } else {
          field = query.shift();
          count = this.extractCount(item[field], query);
        }
      }
      return count;
    };

    GetShare.prototype.replaceString = function(str) {
      var key, ref, rgx, value;
      ref = this.share;
      for (key in ref) {
        value = ref[key];
        if ((value != null) && typeof value === "string") {
          rgx = new RegExp("{" + key + "}", "g");
          str = str.replace(rgx, value);
        }
      }
      return str;
    };

    GetShare.prototype.getCoinContent = function(name, urlhook) {
      return "<b>My " + name + " Address:</b><br/>\n<br/>\n<input class=\"getshare-coin-address\" type=\"text\" readonly onclick=\"this.select();\" value=\"{id}\"/><br/>\n<a class=\"getshare-coin-link\" href=\"" + urlhook + ":{id}\" target=\"_blank\">\n  send address to your wallet\n</a>";
    };

    GetShare.prototype.convertCount = function(n) {
      var str;
      str = (function() {
        switch (false) {
          case !(n >= 1000000000):
            return (n / 1000000).toFixed(0) + "M";
          case !(n >= 10000000):
            return (n / 1000000).toFixed(1) + "M";
          case !(n >= 1000000):
            return (n / 1000).toFixed(0) + "k";
          case !(n >= 10000):
            return (n / 1000).toFixed(1) + "k";
          default:
            return n.toFixed(0);
        }
      })();
      return str;
    };

    GetShare.prototype.getNetworkDefaults = function(network) {
      switch (network) {
        case "twitter":
          return {
            button: {
              attr: {
                title: "Share on Twitter"
              }
            },
            popover: {
              width: 550,
              height: 330,
              url: "https://twitter.com/home?status={encMessage}"
            },
            counter: {
              query: {
                url: "https://urls.api.twitter.com/1/urls/count.json?url={encUrl}&callback=?",
                path: "count"
              }
            }
          };
        case "twitterProfile":
          return {
            button: {
              attr: {
                title: "View Profile on Twitter"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://twitter.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/twitterProfile/{id}/?callback=?",
                path: "followers_count"
              }
            }
          };
        case "facebook":
          return {
            button: {
              attr: {
                title: "Share on Facebook"
              }
            },
            popover: {
              width: 550,
              height: 270,
              url: "https://www.facebook.com/share.php?u={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.facebook.com/method/fql.query?query=select%20total_count,like_count,comment_count,share_count,click_count%20from%20link_stat%20where%20url='{encUrl}'&format=json&callback=?",
                path: "total_count"
              }
            }
          };
        case "facebookFollower":
          return {
            button: {
              attr: {
                title: "View Profile on Facebook"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://www.facebook.com/{id}"
            },
            counter: {
              query: {
                url: "https://graph.facebook.com/{id}?callback=?",
                path: "likes"
              }
            }
          };
        case "pinterest":
          return {
            button: {
              attr: {
                title: "Share on Pinterest"
              }
            },
            popover: {
              width: 750,
              height: 350,
              url: "https://pinterest.com/pin/create/bookmarklet/?media={encImageUrl}&url={encUrl}&is_video=false&description={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.pinterest.com/v1/urls/count.json?url={encUrl}&callback=?",
                path: "count"
              }
            }
          };
        case "pinterestPins":
          return {
            button: {
              attr: {
                title: "View Profile on Pinterest"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://www.pinterest.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/pinterestPins/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "pinterestFollower":
          return {
            button: {
              attr: {
                title: "View Profile on Pinterest"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://www.pinterest.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/pinterestFollower/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "linkedin":
          return {
            button: {
              attr: {
                title: "Share on LinkedIn"
              }
            },
            popover: {
              width: 550,
              height: 450,
              url: "https://www.linkedin.com/shareArticle?mini=true&url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://www.linkedin.com/countserv/count/share?url={encUrl}&callback=?",
                path: "count"
              }
            }
          };
        case "delicious":
          return {
            button: {
              attr: {
                title: "Share on Delicious"
              }
            },
            popover: {
              width: 550,
              height: 420,
              url: "https://del.icio.us/post?url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://feeds.delicious.com/v2/json/urlinfo/data?url={encUrl}&callback=?",
                path: "total_posts"
              }
            }
          };
        case "reddit":
          return {
            button: {
              attr: {
                title: "Share on Reddit"
              }
            },
            popover: {
              width: 840,
              height: 800,
              url: "https://www.reddit.com/submit?url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://www.reddit.com/api/info.json?url={encUrl}&limit=100&jsonp=?",
                path: "data.children.data.score"
              }
            }
          };
        case "googleplus":
          return {
            button: {
              attr: {
                title: "Share on Google+"
              }
            },
            popover: {
              width: 550,
              height: 475,
              url: "https://plus.google.com/share?url={encUrl}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/googleplus/{encUrl}/?callback=?",
                path: ""
              }
            }
          };
        case "flattr":
          return {
            button: {
              attr: {
                title: "Donate with Flattr"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://flattr.com/submit/auto?url={encUrl}&user_id={id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/flattr/{encUrl}/?callback=?",
                path: ""
              }
            }
          };
        case "youtubeSubscriber":
          return {
            button: {
              attr: {
                title: "View Profile on YouTube"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://www.youtube.com/{id}"
            },
            counter: {
              query: {
                url: "https://gdata.youtube.com/feeds/api/users/{id}?alt=json&callback=?",
                path: "entry.yt$statistics.subscriberCount"
              }
            }
          };
        case "stumbleupon":
          return {
            button: {
              attr: {
                title: "Share on StumbleUpon"
              }
            },
            popover: {
              width: 900,
              height: 500,
              url: "https://www.stumbleupon.com/submit?url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/stumbleupon/{encUrl}/?callback=?",
                path: "result.views"
              }
            }
          };
        case "buffer":
          return {
            button: {
              attr: {
                title: "Share on Buffer"
              }
            },
            popover: {
              width: 900,
              height: 500,
              url: "https://bufferapp.com/add/?url={encUrl}&text={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.bufferapp.com/1/links/shares.json?url={encUrl}&callback=?",
                path: "shares"
              }
            }
          };
        case "vk":
          return {
            button: {
              attr: {
                title: "Share on VKontakte"
              }
            },
            popover: {
              width: 550,
              height: 350,
              url: "https://vk.com/share.php?url={encUrl}"
            },
            counter: {
              query: {
                url: "https://vk.com/share.php?act=count&index=1&url={encUrl}&format=json&callback=?",
                path: ""
              }
            }
          };
        case "pocket":
          return {
            button: {
              attr: {
                title: "Save in Pocket"
              }
            },
            popover: {
              width: 550,
              height: 550,
              url: "https://getpocket.com/save?url={encUrl}&title={encMessage}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/pocket/{encUrl}/?callback=?",
                path: ""
              }
            }
          };
        case "weibo":
          return {
            button: {
              attr: {
                title: "Share on Weibo"
              }
            },
            popover: {
              width: 550,
              height: 450,
              url: "https://tieba.baidu.com/i/app/open_share_api?link={encUrl}"
            },
            counter: {
              query: {
                urlShortener: "https://api.weibo.com/2/short_url/shorten.json?source=8003029170&url_long={encUrl}&callback=?",
                url: "https://api.weibo.com/2/short_url/share/counts.json?source=8003029170&url_short={encUrl}&callback=?",
                path: "data.urls.share_counts"
              }
            }
          };
        case "codepenProfile":
          return {
            button: {
              attr: {
                title: "View Profile on CodePen"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://codepen.io/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/codepenProfile/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "codepenPen":
          return {
            button: {
              attr: {
                title: "View Pen on CodePen"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://codepen.io/{id}/full/{itemId}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/codepenPen/{id}/{itemId}/?callback=?",
                path: ""
              }
            }
          };
        case "githubProfile":
          return {
            button: {
              attr: {
                title: "View Profile on GitHub"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://github.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/githubProfile/{id}/?callback=?",
                path: "followers"
              }
            }
          };
        case "githubRepository":
          return {
            button: {
              attr: {
                title: "View Repository on GitHub"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://github.com/{id}/{itemId}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/githubRepository/{id}/{itemId}/?callback=?",
                path: "stargazers_count"
              }
            }
          };
        case "dribbblePlayerLikes":
          return {
            button: {
              attr: {
                title: "View Profile on Dribbble"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://dribbble.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.dribbble.com/players/{id}?callback=?",
                path: "likes_received_count"
              }
            }
          };
        case "dribbblePlayerFollowers":
          return {
            button: {
              attr: {
                title: "View Profile on Dribbble"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://dribbble.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.dribbble.com/players/{id}?callback=?",
                path: "followers_count"
              }
            }
          };
        case "dribbbleShot":
          return {
            button: {
              attr: {
                title: "View Shot on Dribbble"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://dribbble.com/shots/{id}"
            },
            counter: {
              query: {
                url: "https://api.dribbble.com/shots/{id}?callback=?",
                path: "likes_count"
              }
            }
          };
        case "xing":
          return {
            button: {
              attr: {
                title: "Share on Xing"
              }
            },
            popover: {
              width: 550,
              height: 300,
              url: "https://www.xing.com/social_plugins/share/new?url={encUrl}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/xing/{encUrl}/?callback=?",
                path: ""
              }
            }
          };
        case "surfingbird":
          return {
            button: {
              attr: {
                title: "View on Surfingbird"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://surfingbird.ru/surf/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/surfingbird/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "instagram":
          return {
            button: {
              attr: {
                title: "View Profile on Instagram"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://instagram.com/{id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/instagram/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "hackernews":
          return {
            button: {
              attr: {
                title: "View on Hacker News"
              }
            },
            popover: {
              target: "_blank",
              options: false,
              url: "https://news.ycombinator.com/item?id={id}"
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/hackernews/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "bitcoin":
          return {
            button: {
              attr: {
                title: "Donate Bitcoin"
              }
            },
            popover: {
              content: this.getCoinContent("Bitcoin", "bitcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/bitcoin/{id}/?callback=?",
                path: "n_tx"
              }
            }
          };
        case "litecoin":
          return {
            button: {
              attr: {
                title: "Donate Litecoin"
              }
            },
            popover: {
              content: this.getCoinContent("Litecoin", "litecoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/litecoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "feathercoin":
          return {
            button: {
              attr: {
                title: "Donate Feathercoin"
              }
            },
            popover: {
              content: this.getCoinContent("Feathercoin", "feathercoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/feathercoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "freicoin":
          return {
            button: {
              attr: {
                title: "Donate Freicoin"
              }
            },
            popover: {
              content: this.getCoinContent("Freicoin", "freicoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/freicoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "terracoin":
          return {
            button: {
              attr: {
                title: "Donate Terracoin"
              }
            },
            popover: {
              content: this.getCoinContent("Terracoin", "terracoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/terracoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "peercoin":
          return {
            button: {
              attr: {
                title: "Donate Peercoin"
              }
            },
            popover: {
              content: this.getCoinContent("Peercoin", "peercoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/peercoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "novacoin":
          return {
            button: {
              attr: {
                title: "Donate Novacoin"
              }
            },
            popover: {
              content: this.getCoinContent("Novacoin", "novacoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/novacoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "bbqcoin":
          return {
            button: {
              attr: {
                title: "Donate BBQCoin"
              }
            },
            popover: {
              content: this.getCoinContent("BBQCoin", "bbqcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/bbqcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "bytecoin":
          return {
            button: {
              attr: {
                title: "Donate Bytecoin"
              }
            },
            popover: {
              content: this.getCoinContent("Bytecoin", "bytecoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/bytecoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "bitbar":
          return {
            button: {
              attr: {
                title: "Donate BitBar"
              }
            },
            popover: {
              content: this.getCoinContent("BitBar", "bitbar")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/bitbar/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "digitalcoin":
          return {
            button: {
              attr: {
                title: "Donate Digitalcoin"
              }
            },
            popover: {
              content: this.getCoinContent("Digitalcoin", "digitalcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/digitalcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "jkcoin":
          return {
            button: {
              attr: {
                title: "Donate JKCoin"
              }
            },
            popover: {
              content: this.getCoinContent("JKCoin", "jkcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/jkcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "frankos":
          return {
            button: {
              attr: {
                title: "Donate Frankos"
              }
            },
            popover: {
              content: this.getCoinContent("Frankos", "frankos")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/frankos/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "goldcoin":
          return {
            button: {
              attr: {
                title: "Donate Goldcoin"
              }
            },
            popover: {
              content: this.getCoinContent("Goldcoin", "goldcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/goldcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "worldcoin":
          return {
            button: {
              attr: {
                title: "Donate Worldcoin"
              }
            },
            popover: {
              content: this.getCoinContent("Worldcoin", "worldcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/worldcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "craftcoin":
          return {
            button: {
              attr: {
                title: "Donate CraftCoin"
              }
            },
            popover: {
              content: this.getCoinContent("CraftCoin", "craftcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/craftcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        case "quarkcoin":
          return {
            button: {
              attr: {
                title: "Donate QuarkCoin"
              }
            },
            popover: {
              content: this.getCoinContent("QuarkCoin", "quarkcoin")
            },
            counter: {
              query: {
                url: "https://api.getshar.es/counts/quarkcoin/{id}/?callback=?",
                path: ""
              }
            }
          };
        default:
          return {};
      }
    };

    return GetShare;

  })();

}).call(this);

//# sourceMappingURL=index.js.map
