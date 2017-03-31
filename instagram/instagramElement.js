function instagramFetch(e) {
    var a = e.accessToken, t = {access_token: a};
    fetchCMD(t, e)
}
function fetchCMD(e, a) {
    var t = "";
    if ("user" == a.mode)t = "https://api.instagram.com/v1/users/" + a.userID + "/media/recent/?callback=?"; else if ("liked" == a.mode)t = "https://api.instagram.com/v1/users/self/media/liked?count=" + a.count + "&callback=?"; else if ("popular" == a.mode)t = "https://api.instagram.com/v1/media/popular?callback=?"; else if ("location" == a.mode)t = "https://api.instagram.com/v1/locations/" + a.locationID + "/media/recent/?callback=?"; else {
        if ("multitag" == a.mode) {
            var o = a.tag.replace(/ /g, "");
            return o = o.split(","), a.multiCompleteTotal = o.length - 1, a.multiCompleteCount = 0, jQuery.each(o, function (n) {
                t = "https://api.instagram.com/v1/tags/" + o[n] + "/media/recent?callback=?", jQuery.getJSON(t, e, function (e) {
                    onPhotoLoaded(e, a, "off")
                })
            }), !1
        }
        if ("multiuser" == a.mode) {
            var n = a.userID;
            return n = n.split(","), a.multiCompleteTotal = n.length - 1, a.multiCompleteCount = 0, jQuery.each(n, function (o) {
                t = "https://api.instagram.com/v1/users/" + n[o] + "/media/recent/?callback=?", jQuery.getJSON(t, e, function (e) {
                    onPhotoLoaded(e, a, "off")
                })
            }), !1
        }
        var r = a.tag.replace(/ /g, "");
        t = "https://api.instagram.com/v1/tags/" + r + "/media/recent?callback=?"
    }
    jQuery.getJSON(t, e, function (e) {
        onPhotoLoaded(e, a)
    })
}
function instagramUserSearch(e) {
    var a = e.accessToken, t = e.user, o = {access_token: a, q: t};
    userSearchCMD(o, e)
}
function userSearchCMD(e, a) {
    var t = "https://api.instagram.com/v1/users/search?callback=?";
    jQuery.getJSON(t, e, function (e) {
        onUserLoaded(e, a)
    })
}
function onUserLoaded(e, a) {
    if (200 == e.meta.code) {
        var t = e.data;
        if (t.length > 0) {
            for (var o in t) {
                var n = t[o], r = "";
                r = '<div class="instagram-user-all" id="p' + n.id + '" title="' + n.username + '" rel="' + n.id + '">', r += "<img src='" + n.profile_picture + "' />", r += "</div>", jQuery(r).appendTo(a.element)
            }
            jQuery('<div class="clear"></div><span class="ig-glyph"></span>').appendTo(a.element)
        } else alert("No users found with this name.")
    }
}
function instagramTagsLoadMore(e) {
    var a = e.accessToken, t = {access_token: a, max_tag_id: e.instagramBrowserNextMax};
    if ("tag" == e.mode || "contest" == e.mode)var o = e.tag.replace(/ /g, "");
    loadMoreCMD(e, t, o)
}
function loadMoreCMD(e, a, t) {
    var o = "https://api.instagram.com/v1/tags/" + t + "/media/recent?callback=?";
    jQuery.getJSON(o, a, function (a) {
        onPhotoLoaded(a, e)
    })
}
function instagramUsersLoadMore(e) {
    var a = e.accessToken, t = {access_token: a, max_id: e.instagramBrowserNextMax};
    loadMoreUsersCMD(e, t)
}
function loadMoreUsersCMD(e, a) {
    var t = "https://api.instagram.com/v1/users/" + e.userID + "/media/recent/?callback=?";
    jQuery.getJSON(t, a, function (a) {
        onPhotoLoaded(a, e)
    })
}
function instagramLocationLoadMore(e) {
    var a = e.accessToken, t = {access_token: a, max_id: e.instagramBrowserNextMax};
    loadMoreLocationsCMD(e, t)
}
function loadMoreLocationsCMD(e, a) {
    var t = "https://api.instagram.com/v1/locations/" + e.locationID + "/media/recent/?callback=?";
    jQuery.getJSON(t, a, function (a) {
        onPhotoLoaded(a, e)
    })
}
function instagramLikedLoadMore(e) {
    var a = e.accessToken, t = {access_token: a, max_like_id: e.instagramBrowserNextMax};
    loadMoreLikedCMD(e, t)
}
function loadMoreLikedCMD(e, a) {
    var t = "https://api.instagram.com/v1/users/self/media/liked?count=" + e.count + "&callback=?";
    jQuery.getJSON(t, a, function (a) {
        onPhotoLoaded(a, e)
    })
}
function startVideoPlayer(e) {
    if (e.video) {
        var a = ["playpause", "progress", "volume", "fullscreen"];
        0 == e.showVideoControls && (a = [""]), jQuery(".instagram-element-video").not(".converted").mediaelementplayer({
            alwaysShowControls: !1,
            videoVolume: "horizontal",
            features: a
        }), jQuery(".instagram-element-video").addClass("converted"), 0 == e.showVideoControls && jQuery(".mejs-controls").remove()
    }
}
function startFancybox(e) {
    jQuery(".instagram-photo").fancybox({
        openEffect: "elastic",
        closeEffect: "elastic",
        helpers: {title: {type: "inside"}}
    })
}
function convertDate(e, a) {
    var t = parseInt(e);
    return t = new Date(1e3 * t), t = dateFormat(t, a)
}
function onPhotoLoaded(e, a, t) {
    if (e.pagination ? e.pagination.next_max_id ? a.instagramBrowserNextMax = e.pagination.next_max_id : e.pagination.next_max_like_id ? a.instagramBrowserNextMax = e.pagination.next_max_like_id : a.instagramBrowserNextMax = "Empty" : a.instagramBrowserNextMax = "Empty", 200 == e.meta.code) {
        var o = e.data;
        if ("" != a.element.html())var n = !0; else var n = !1;
        if (o.length > 0) {
            for (var r in o)if (a.limit < 20 && r >= a.limit); else {
                var s = o[r];
                if ("contest" == a.mode && 0 == s.user_has_liked)continue;
                var i = "", l = "";
                if ("" == s.user.full_name && (s.user.full_name = s.user.username), s.user.full_name = s.user.full_name.replace(/"/g, "'"), a.showUsername && (l += "<span class='username-ui'>" + s.user.full_name + "</span><br />"), a.showDate) {
                    var m = parseInt(s.created_time);
                    m = new Date(1e3 * m), m = dateFormat(m, "dddd, mmmm dS, yyyy, h:MM TT"), l += "<span class='date-ui'>" + m + "</span>"
                }
                a.showDescription && s.caption && (l += "<span class='description-ui'>" + s.caption.text.replace(/"/g, "'") + ".</span>"), a.showLikes && (l += " <span class='likes-ui'>(" + s.likes.count + " Likes)</span>"), a.showComments && (l += " <span class='comments-ui'>(" + s.comments.count + " Comments)</span>"), a.showLocation && s.location && (l += "<br /><span class='location-ui'>Location: " + s.location.name.replace(/"/g, "'") + "</span>"), a.showLink && null != s.link && (l += "<a target='_blank' class='link-ui' href='" + s.link + "'> View Photo</a>");
                var c = "None";
                s.videos && (c = s.videos.standard_resolution.url);
                var d = a.element.selector.replace(".", "");
                d = d.replace("#", ""), "video" == s.type && 1 == a.video ? (i = '<a class="instagram-photo video" id="p' + s.id + '" href="#video-' + s.id + '" data-name="' + s.user.full_name + '" data-fancybox-title="' + l + '" data-created="' + s.created_time + '" data-author="' + s.user.username + '" data-likes="' + s.likes.count + '" data-comments="' + s.comments.count + '" data-video="' + c + '" data-profile="' + s.user.profile_picture + '" rel="group-' + d + '">', i += '<img src="' + s.images.standard_resolution.url.replace('/s640x640/', '/') + '" />', i += '<span class="element-meta"><strong>' + s.user.full_name + "</strong><span>" + s.user.username + "</span></span>", i += '<span class="icon">Video</span>', i += '<div id="video-' + s.id + '" style="display:none; height:auto; width:1080px;">', i += '<video class="instagram-element-video" width="100%" height="100%">', i += '<source src="' + c + '"></source>', i += "</video>", i += "</div>", i += "</a>") : (i = '<a class="instagram-photo image" id="p' + s.id + '" href="' + s.images.standard_resolution.url.replace('/s640x640/', '/') + '" data-name="' + s.user.full_name + '" data-fancybox-title="' + l + '" data-created="' + s.created_time + '" data-author="' + s.user.username + '" data-likes="' + s.likes.count + '" data-comments="' + s.comments.count + '" data-profile="' + s.user.profile_picture + '" rel="group-' + d + '">', i += '<img src="' + s.images.standard_resolution.url.replace('/s640x640/', '/') + '" />', i += '<span class="element-meta"><strong>' + s.user.full_name + "</strong><span>" + s.user.username + "</span></span>", i += '<span class="icon">Image</span>', i += "</a>"), jQuery(i).appendTo(a.element)
            }
            var u = jQuery(".instagram-photo").size() - 1;
            0 == n && 0 == a.isDemo && jQuery(".instagram-photo").hide(), jQuery(".instagram-photo").each(function (e) {
                currentPhoto = jQuery(this), currentPhoto.delay(a.delayInterval * e).fadeIn(a.speed), a.limit < 20 && r >= a.limit || (a.element.find(".seachInstagramLoadMoreContainer").remove(), e == u && "Empty" != a.instagramBrowserNextMax && jQuery('<div class="seachInstagramLoadMoreContainer"><a class="seachInstagramLoadMore btn btn-inverse">Load More</a></div>').appendTo(a.element), "off" == t && jQuery(".seachInstagramLoadMoreContainer").remove())
            }), (0 == a.elementComplete || "contest" == a.galleryMode) && ("multiuser" == a.mode || "multitag" == a.mode ? (a.multiCompleteCount >= a.multiCompleteTotal && (displayGalleryByType(a), a.elementComplete = !0), a.multiCompleteCount++) : (displayGalleryByType(a), a.elementComplete = !0)), startVideoPlayer(a)
        } else alert("empty")
    } else alert(e.meta.error_message)
}
function displayGalleryByType(e) {
    var a = {
        BlackBerry: function () {
            return navigator.userAgent.match(/BlackBerry/i)
        }, iOS: function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i)
        }, Opera: function () {
            return navigator.userAgent.match(/Opera Mini/i)
        }, Windows: function () {
            return navigator.userAgent.match(/IEMobile/i)
        }, any: function () {
            return a.BlackBerry() || a.iOS() || a.Opera() || a.Windows()
        }
    };
    "classic" == e.galleryMode && (startFancybox(e), jQuery(document).on({
        mouseenter: function () {
            var e = jQuery(this).find(".element-meta").outerHeight();
            jQuery(this).find(".element-meta").stop().animate({
                opacity: 1,
                top: "50%",
                "margin-top": "-" + e / 2 + "px"
            }, 300), a.any() && jQuery(this).trigger("click")
        }, mouseleave: function () {
            jQuery(this).find(".element-meta").stop().animate({opacity: 0, top: "90%"}, 300, function () {
                jQuery(this).removeAttr("style")
            })
        }
    }, ".instagram-element .instagram-photo"))
}
jQuery.fn.instagramElement = function (e) {
    var a = {
        accessToken: "",
        mode: "popular",
        userID: "1138644",
        tag: "sports",
        locationID: "230548",
        galleryMode: "classic",
        video: !1,
        speed: 700,
        delayInterval: 80,
        showVideoControls: !1,
        count: 20,
        limit: 20,
        showUsername: !0,
        showDescription: !0,
        showLikes: !0,
        showComments: !0,
        showLocation: !0,
        showDate: !0,
        showLink: !0
    };
    return a.element = jQuery(this), a.instagramBrowserNextMax = "", a.elementComplete = !1, a.isDemo = !1, jQuery.extend(a, e), this.each(function () {
        jQuery(document).ready(function () {
            a.element.addClass("instagram-element"), instagramFetch(a), jQuery(document).on("click", a.element.selector + " .seachInstagramLoadMore", function () {
                "tag" == a.mode || "contest" == a.mode ? instagramTagsLoadMore(a) : "user" == a.mode ? instagramUsersLoadMore(a) : "location" == a.mode ? instagramLocationLoadMore(a) : "liked" == a.mode && instagramLikedLoadMore(a)
            }), jQuery("#searchByTag .submit").click(function () {
                if ("classic" == a.galleryMode) {
                    a.element.find(".instagram-photo").remove(), a.element.find(".instagram-user-all, .ig-glyph").remove();
                    var e = a;
                    return e.mode = "tag", e.tag = jQuery("input.searchTag").val().replace(/ /g, ""), e.isDemo = !0, e.video = !0, e.showVideoControls = !0, "" == e.tag ? (e.element.find(".seachInstagramLoadMoreContainer").remove(), alert("Please enter a valid hashtag."), !1) : (instagramFetch(e), jQuery("html,body").animate({scrollTop: a.element.offset().top - 70}), !1)
                }
            }), jQuery("#searchByUser .submit").click(function () {
                if ("classic" == a.galleryMode) {
                    a.element.find(".instagram-photo").remove(), a.element.find(".instagram-user-all, .ig-glyph").remove(), a.element.find(".seachInstagramLoadMoreContainer").remove();
                    var e = a;
                    return e.mode = "user", e.user = jQuery("input.searchUser").val().replace(/ /g, ""), e.isDemo = !0, e.video = !0, e.showVideoControls = !0, "" == e.user ? (e.element.find(".seachInstagramLoadMoreContainer").remove(), alert("Please enter a valid username."), !1) : (instagramUserSearch(e), jQuery("html,body").animate({scrollTop: a.element.offset().top - 150}), !1)
                }
            }), jQuery("select.searchLocation").change(function () {
                if ("classic" == a.galleryMode) {
                    a.element.find(".instagram-photo").remove(), a.element.find(".instagram-user-all, .ig-glyph").remove(), a.element.find(".seachInstagramLoadMoreContainer").remove();
                    var e = a;
                    return e.mode = "location", e.locationID = jQuery(this).val().replace(/ /g, ""), e.isDemo = !0, e.video = !0, e.showVideoControls = !0, "" == e.locationID ? (e.element.find(".seachInstagramLoadMoreContainer").remove(), alert("Please enter a valid location."), !1) : (instagramFetch(e), jQuery("html,body").animate({scrollTop: a.element.offset().top - 70}), !1)
                }
            }), jQuery("select.limitPhotos").change(function () {
                if ("classic" == a.galleryMode) {
                    a.element.find(".instagram-photo").remove(), a.element.find(".instagram-user-all, .ig-glyph").remove(), a.element.find(".seachInstagramLoadMoreContainer").remove();
                    var e = a;
                    return e.isDemo = !0, e.video = !0, e.showVideoControls = !0, e.limit = parseInt(jQuery(this).val()), instagramFetch(e), jQuery("html,body").animate({scrollTop: a.element.offset().top - 70}), !1
                }
            }), jQuery(document).on("click", ".instagram-user-all", function () {
                if ("classic" == a.galleryMode) {
                    a.element.find(".instagram-photo").remove(), a.element.find(".instagram-user-all, .ig-glyph").remove();
                    var e = a;
                    e.mode = "user", e.userID = jQuery(this).attr("rel"), e.isDemo = !0, instagramFetch(e)
                }
            })
        })
    })
};
