angular.module("dei_verbum.controllers", [])



// TODO: indexCtrl --|-- 
.controller("indexCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;

	// TODO: indexCtrl --|-- $rootScope.exitApp
	$rootScope.exitApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm Exit",
			template: "Are you sure you want to exit?"
		});
		confirmPopup.then(function (close){
			if(close){
				ionic.Platform.exitApp();
			}
			$rootScope.closeMenuPopover();
		});
	};
	
	// TODO: indexCtrl --|-- $rootScope.changeLanguage
	$rootScope.changeLanguage = function(langKey){
		if(typeof langKey !== null){
			$translate.use(langKey);
			tmhDynamicLocale.set(langKey);
			try {
				$rootScope.language_option = langKey;
				localforage.setItem("language_option",langKey);
			}catch(e){
				localforage.setItem("language_option","en-us");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showLanguageDialog
	var modal_language = "";
	modal_language += "<ion-modal-view>";
	modal_language += "<ion-header-bar class=\"bar bar-header bar-positive-900\">";
	modal_language += "<h1 class=\"title\">{{ 'Language' | translate }}</h1>";
	modal_language += "</ion-header-bar>";
	modal_language += "<ion-content class=\"padding\">";
	modal_language += "<div class=\"list\">";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'en-us'\" ng-click=\"tryChangeLanguage('en-us')\">English - US</ion-radio>";
	modal_language += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"language_option\" ng-value=\"'id'\" ng-click=\"tryChangeLanguage('id')\">Indonesian</ion-radio>";
	modal_language += "<button class=\"button button-full button-positive-900\" ng-click=\"closeLanguageDialog()\">{{ 'Close' | translate }}</button>";
	modal_language += "</div>";
	modal_language += "</ion-content>";
	modal_language += "</ion-modal-view>";
	
	$rootScope.languageDialog = $ionicModal.fromTemplate(modal_language,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showLanguageDialog = function(){
		$rootScope.languageDialog.show();
		localforage.getItem("language_option", function(err, value){
			$rootScope.language_option = value;
		}).then(function(value){
			$rootScope.language_option = value;
		}).catch(function (err){
			$rootScope.language_option = "en-us";
		})
	};
	
	$rootScope.closeLanguageDialog = function(){
		$rootScope.languageDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	$rootScope.tryChangeLanguage = function(langKey){
		$rootScope.changeLanguage(langKey);
	};
	
	localforage.getItem("language_option", function(err, value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("language_option","en-us");
		}else{
			$rootScope.changeLanguage(value);
		}
	}).catch(function (err){
		localforage.setItem("language_option","en-us");
	})
	// TODO: indexCtrl --|-- $rootScope.changeFontSize
	$rootScope.changeFontSize = function(fontSize){
		if(typeof fontSize !== null){
			try {
				$rootScope.fontsize_option = $rootScope.fontsize = fontSize;
				localforage.setItem("fontsize_option",fontSize);
			}catch(e){
				localforage.setItem("fontsize_option","normal");
			}
		}
	};
	
	// TODO: indexCtrl --|-- $rootScope.showFontSizeDialog
	var modal_fontsize = "";
	modal_fontsize += "<ion-modal-view>";
	modal_fontsize += "<ion-header-bar class=\"bar bar-header bar-positive-900\">";
	modal_fontsize += "<h1 class=\"title\">{{ 'Font Size' | translate }}</h1>";
	modal_fontsize += "</ion-header-bar>";
	modal_fontsize += "<ion-content class=\"padding\">";
	modal_fontsize += "<div class=\"list\">";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'small'\" ng-click=\"tryChangeFontSize('small');\">{{ 'Small' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'normal'\" ng-click=\"tryChangeFontSize('normal');\">{{ 'Normal' | translate }}</ion-radio>";
	modal_fontsize += "<ion-radio icon=\"icon ion-android-radio-button-on\" ng-model=\"fontsize_option\" ng-value=\"'large'\" ng-click=\"tryChangeFontSize('large');\">{{ 'Large' | translate }}</ion-radio>";
	modal_fontsize += "<button class=\"button button-full button-positive-900\" ng-click=\"closeFontSizeDialog()\">{{ 'Close' | translate }}</button>";
	modal_fontsize += "</div>";
	modal_fontsize += "</ion-content>";
	modal_fontsize += "</ion-modal-view>";
	
	$rootScope.fontSizeDialog = $ionicModal.fromTemplate(modal_fontsize,{
		scope: $scope,
		animation: "slide-in-up"
	});
	
	$rootScope.showFontSizeDialog = function(){
		$rootScope.fontSizeDialog.show();
		localforage.getItem("fontsize_option", function(err, value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).then(function(value){
			$rootScope.fontsize_option = $rootScope.fontsize = value;
		}).catch(function (err){
			$rootScope.fontsize_option = $rootScope.fontsize = "normal";
		})
	};
	
	$rootScope.closeFontSizeDialog = function(){
		$rootScope.fontSizeDialog.hide();
		$rootScope.closeMenuPopover();
	};
	
	localforage.getItem("fontsize_option", function(err, value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).then(function(value){
		if(value === null){
			localforage.setItem("fontsize_option","normal");
		}else{
			$rootScope.changeFontSize(value);
		}
	}).catch(function (err){
		console.log(err);
		localforage.setItem("fontsize_option","normal");
	})
	
	
	$rootScope.tryChangeFontSize = function(val){
		$rootScope.changeFontSize(val);
	};
	
	// TODO: indexCtrl --|-- $rootScope.clearCacheApp
	$rootScope.clearCacheApp = function(){
		var confirmPopup = $ionicPopup.confirm({
			title: "Confirm",
			template: "Are you sure you want to clear cache?"
		});
		confirmPopup.then(function (close){
			if(close){
				localforage.keys().then(function(keys) {
					for(var e = 0; e < keys.length ; e++) {
						localforage.setItem(keys[e],[]);
					}
					$state.go("dei_verbum.dashboard");
				}).catch(function(err) {
					$state.go("dei_verbum.dashboard");
				});
			}
			$rootScope.closeMenuPopover();
		});
	};
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: indexCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: indexCtrl --|-- $scope.openURL
	// open external browser 
	$rootScope.openURL = function($url){
		window.open($url,"_system","location=yes");
	};
	// TODO: indexCtrl --|-- $scope.openAppBrowser
	// open AppBrowser
	$rootScope.openAppBrowser = function($url){
		var appBrowser = window.open($url,"_blank","hardwareback=Done,hardwareback=Done,toolbarposition=top,location=yes");
	
		appBrowser.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appBrowser.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appBrowser.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appBrowser.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.openWebView
	// open WebView
	$rootScope.openWebView = function($url){
		var appWebview = window.open($url,"_blank","location=no,toolbar=no");
	
		appWebview.addEventListener("loadstart",function(){
			navigator.notification.activityStart("Please Wait", "Its loading....");
		});
	
	
		appWebview.addEventListener("loadstop",function(){
			navigator.notification.activityStop();
		});
	
	
		appWebview.addEventListener("loaderror",function(){
			navigator.notification.activityStop();
			window.location = "retry.html";
		});
	
	
		appWebview.addEventListener("exit",function(){
			navigator.notification.activityStop();
		});
	
	};
	
	
	// TODO: indexCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: indexCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: indexCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `index` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: side_menusCtrl --|-- 
.controller("side_menusCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "-" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: side_menusCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: side_menusCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: side_menusCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 
	
	var popover_template = "";
	popover_template += "<ion-popover-view class=\"fit\">";
	popover_template += "	<ion-header-bar>";
	popover_template += "		<h1  class=\"title\">Bantuan</h1>";
	popover_template += "	</ion-header-bar>";
	popover_template += "	<ion-content>";
	popover_template += "		<ion-list>";
	popover_template += "			<a  class=\"item dark-ink\" ng-click=\"showLanguageDialog()\" >";
	popover_template += "			{{ 'Bahasa' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-click=\"showFontSizeDialog()\" >";
	popover_template += "			{{ 'Ukuran Tulisan' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-click=\"openWebView('https://dei-verbum.ayomulai.online//wp-admin/')\">";
	popover_template += "			{{ 'Administrator' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-href=\"#/dei_verbum/faqs\" ng-click=\"popover.hide()\">";
	popover_template += "			{{ 'Tanya Jawab' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-href=\"#/dei_verbum/about_us\" ng-click=\"popover.hide()\">";
	popover_template += "			{{ 'Tentang Kami' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-click=\"clearCacheApp()\" >";
	popover_template += "			{{ 'Bersihkan Cache' | translate }}";
	popover_template += "			</a>";
	popover_template += "			<a  class=\"item dark-ink\" ng-click=\"exitApp()\">";
	popover_template += "			{{ 'Exit' | translate }}";
	popover_template += "			</a>";
	popover_template += "		</ion-list>";
	popover_template += "	</ion-content>";
	popover_template += "</ion-popover-view>";
	
	
	$scope.popover = $ionicPopover.fromTemplate(popover_template,{
		scope: $scope
	});
	
	$scope.closePopover = function(){
		$scope.popover.hide();
	};
	
	$rootScope.closeMenuPopover = function(){
		$scope.popover.hide();
	};
	
	$scope.$on("$destroy", function(){
		$scope.popover.remove();
	});

	// TODO: side_menusCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
			
		} catch(e){
			console.log("%cerror: %cPage: `side_menus` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: about_usCtrl --|-- 
.controller("about_usCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: about_usCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: about_usCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: about_usCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: about_usCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `about_us` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: bookmarksCtrl --|-- 
.controller("bookmarksCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: bookmarksCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: bookmarksCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: bookmarksCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: bookmarksCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `bookmarks` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: categoriesCtrl --|-- 
.controller("categoriesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (categorie)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: categoriesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: categoriesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: categoriesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: categoriesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var form = {"uname":"demo","pwd":"demo"};
		$scope.form = {};
		var authPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="form.uname" placeholder="Username"><input type="password" placeholder="Password" ng-model="form.pwd">',
			title: "Authorization",
			subTitle: "Please use username and password",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("dei_verbum.dashboard");
				}},
				{text:"<strong>Save</strong>",type:"button-positive",onTap:function(e){
						return $scope.form;
					}},
			],
		}).then(function(form){
			if( angular.isDefined(form)){
				var uname = form.uname || "demo";
				var pwd = form.pwd || "demo";
				var http_value = "Basic " + base64.encode(uname + ":" + pwd);
				$http.defaults.headers.common["X-Authorization"] = http_value;
				localforage.setItem("ima_session", JSON.stringify(http_value));
				$scope.doRefresh();
			}
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url {{ 'Kategori' | translate }}
	targetQuery = "per_page=100"; //default param
	raplaceWithQuery = "per_page=100";
	
	
	// TODO: categoriesCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: categoriesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/categories?per_page=100";
	// TODO: categoriesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/categories?per_page=100&callback=JSON_CALLBACK";
	// TODO: categoriesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_categories = [];
	
	localforage.getItem("data_categories_" + $scope.hashURL, function(err, get_categories){
		if(get_categories === null){
			data_categories =[];
		}else{
			data_categories = JSON.parse(get_categories);
			$scope.data_categories =JSON.parse( get_categories);
			$scope.categories = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_categories[lastPush])){
					$scope.categories.push(data_categories[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_categories === null ){
		data_categories =[];
	}
	if(data_categories.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: categoriesCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_categories = response.data;
				$scope.data_categories = response.data;
				// TODO: categoriesCtrl --|---------- set:localforage
				localforage.setItem("data_categories_" + $scope.hashURL, JSON.stringify(data_categories));
				$scope.categories = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_categories[lastPush])){
						$scope.categories.push(data_categories[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: categoriesCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_categories = data;
						$scope.data_categories = data;
						$ionicLoading.hide();
						// TODO: categoriesCtrl --|---------- set:localforage
						localforage.setItem("data_categories_" + $scope.hashURL,JSON.stringify(data_categories));
						controller_by_user();
						$scope.categories = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_categories[lastPush])){
								$scope.categories.push(data_categories[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: categoriesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: categoriesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_categories.data)){
					if($scope.data_categories.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: categoriesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: categoriesCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_categories = response.data;
			$scope.data_categories = response.data;
			// TODO: categoriesCtrl --|---------- set:localforage
			localforage.setItem("data_categories_" + $scope.hashURL,JSON.stringify(data_categories));
			$scope.categories = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_categories[lastPush])){
					$scope.categories.push(data_categories[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: categoriesCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_categories = data;
					$scope.data_categories = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: categoriesCtrl --|---------- set:localforage
					localforage.setItem("data_categories_"+ $scope.hashURL,JSON.stringify(data_categories));
					$scope.categories = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_categories[lastPush])){
							$scope.categories.push(data_categories[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: categoriesCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: categoriesCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_categories === null){
		data_categories = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_categories[lastPush])){
				$scope.categories.push(data_categories[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: categoriesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `categories` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: chatCtrl --|-- 
.controller("chatCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: chatCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: chatCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: chatCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: chatCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `chat` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: dashboardCtrl --|-- 
.controller("dashboardCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: dashboardCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: dashboardCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: dashboardCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: dashboardCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `dashboard` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: faqsCtrl --|-- 
.controller("faqsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: faqsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: faqsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: faqsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: faqsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `faqs` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: menu_oneCtrl --|-- 
.controller("menu_oneCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: menu_oneCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: menu_oneCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: menu_oneCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: menu_oneCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `menu_one` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: menu_twoCtrl --|-- 
.controller("menu_twoCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: menu_twoCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: menu_twoCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: menu_twoCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: menu_twoCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `menu_two` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: post_bookmarkCtrl --|-- 
.controller("post_bookmarkCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: post_bookmarkCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: post_bookmarkCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: post_bookmarkCtrl --|-- Database for Cart/Bookmark
	// TODO: post_bookmarkCtrl --|-- $scope.loadDbVirtualPost
	 
	$scope.loadDbVirtualPost = function(){
		$ionicLoading.show();
		//post_bookmark
		$scope.post_bookmark = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				$scope.post_bookmark = []; 
			}else{
				try{
					$scope.post_bookmark = JSON.parse(dbVirtual); 
					$rootScope.item_in_virtual_table_post = $scope.post_bookmark.length;
				}catch (e){
					$scope.post_bookmark = []; 
				}
			}
		}).then(function(value){
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			console.log(err);
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		});
	};
	$scope.$on("$ionicView.enter", function (){
		$scope.loadDbVirtualPost();
	});
	// TODO: post_bookmarkCtrl --|-- $scope.clearDbVirtualPost
	$scope.clearDbVirtualPost = function(){
					$rootScope.item_in_virtual_table_post = 0;
		localforage.setItem("post_bookmark",[]);
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// TODO: post_bookmarkCtrl --|-- $scope.removeDbVirtualPost
	$scope.removeDbVirtualPost = function(itemId){
		var virtual_items = [];
		var last_items = $scope.post_bookmark;
		for(var z=0;z<last_items.length;z++){
			if(itemId!==last_items[z].id){
				virtual_items.push(last_items[z]);
			}
		}
		localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
		$timeout(function(){
			$scope.loadDbVirtualPost();
		},200);
	};
	// code 

	// TODO: post_bookmarkCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `post_bookmark` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: post_singlesCtrl --|-- 
.controller("post_singlesCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: post_singlesCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: post_singlesCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: post_singlesCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: post_singlesCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var form = {"uname":"demo","pwd":"demo"};
		$scope.form = {};
		var authPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="form.uname" placeholder="Username"><input type="password" placeholder="Password" ng-model="form.pwd">',
			title: "Authorization",
			subTitle: "Please use username and password",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("dei_verbum.dashboard");
				}},
				{text:"<strong>Save</strong>",type:"button-positive",onTap:function(e){
						return $scope.form;
					}},
			],
		}).then(function(form){
			if( angular.isDefined(form)){
				var uname = form.uname || "demo";
				var pwd = form.pwd || "demo";
				var http_value = "Basic " + base64.encode(uname + ":" + pwd);
				$http.defaults.headers.common["X-Authorization"] = http_value;
				localforage.setItem("ima_session", JSON.stringify(http_value));
				$scope.doRefresh();
			}
		},function(err){
		},function(msg){
		});
	};
	// TODO: post_singlesCtrl --|-- $scope.addToVirtual(); //data single
	$scope.addToDbVirtual = function(newItem){
		if(typeof newItem.id === "undefined"){
			return false;
		}
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.id ==  last_items[z].id){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_post = virtual_items.length;
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
				$rootScope.item_in_virtual_table_post = virtual_items.length;
			},200);
		})
	};
	
	
	// set default parameter http
	var http_params = {};

	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	// animation loading 
	$ionicLoading.show();
	
	// Retrieving data
	var itemID = $stateParams.id;
	// TODO: post_singlesCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/posts/" + itemID;
	// TODO: post_singlesCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/posts/" + itemID + "?callback=JSON_CALLBACK";
	// TODO: post_singlesCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash($scope.fetchURL);
	
	var current_item = [];
	localforage.getItem("data_post_single_" + $scope.hashURL, function(err, get_datas){
		if(get_datas === null){
			current_item = [];
		}else{
			if(get_datas !== null){
				current_item = JSON.parse(get_datas);
				$timeout(function(){
					$ionicLoading.hide();
					$scope.post = current_item ;
					controller_by_user();
				}, 500);
			};
		};
	}).then(function(value){
	}).catch(function (err){
	})
	if( current_item.length === 0 ){
		var itemID = $stateParams.id;
		var current_item = [];
	
		// set HTTP Header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: post_singlesCtrl --|-- $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: post_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_post_single_" + $scope.hashURL,JSON.stringify(datas));
			current_item = datas ;
		},function(data) {
					// Error message
					var alertPopup = $ionicPopup.alert({
						title: "Network Error" + " (" + data.status + ")",
						template: "An error occurred while collecting data.",
					});
					$timeout(function() {
						alertPopup.close();
					}, 2000);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.post = current_item ;
				controller_by_user();
			}, 500);
		});
	}
	
	
		// TODO: post_singlesCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		// Retrieving data
		var itemID = $stateParams.id;
		var current_item = [];
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: post_singlesCtrl --|------ $http.get
		$http.get($scope.fetchURL,http_header).then(function(response) {
			// Get data single
			var datas = response.data;
			// TODO: post_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_post_single_" + $scope.hashURL,JSON.stringify(datas));
			current_item = datas ;
		},function(data) {
			// Error message
		// TODO: post_singlesCtrl --|---------- $http.jsonp
				$http.jsonp($scope.fetchURLp,http_header).success(function(response){
					// Get data single
					var datas = response;
			// TODO: post_singlesCtrl --|---------- set:localforage
			localforage.setItem("data_post_single_" + $scope.hashURL,JSON.stringify(datas));
					current_item = datas ;
						$scope.$broadcast("scroll.refreshComplete");
						// event done, hidden animation loading
						$timeout(function() {
							$ionicLoading.hide();
							$scope.post = current_item ;
							controller_by_user();
						}, 500);
					}).error(function(resp){
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					});
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				$scope.post = current_item ;
				controller_by_user();
			}, 500);
		});
	};
	// code 

	// TODO: post_singlesCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `post_singles` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: postsCtrl --|-- 
.controller("postsCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (post)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: postsCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: postsCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: postsCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: postsCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var form = {"uname":"demo","pwd":"demo"};
		$scope.form = {};
		var authPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="form.uname" placeholder="Username"><input type="password" placeholder="Password" ng-model="form.pwd">',
			title: "Authorization",
			subTitle: "Please use username and password",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("dei_verbum.dashboard");
				}},
				{text:"<strong>Save</strong>",type:"button-positive",onTap:function(e){
						return $scope.form;
					}},
			],
		}).then(function(form){
			if( angular.isDefined(form)){
				var uname = form.uname || "demo";
				var pwd = form.pwd || "demo";
				var http_value = "Basic " + base64.encode(uname + ":" + pwd);
				$http.defaults.headers.common["X-Authorization"] = http_value;
				localforage.setItem("ima_session", JSON.stringify(http_value));
				$scope.doRefresh();
			}
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	//fix url {{posts[0].x_categories}} ({{paging}})
	targetQuery = "categories=-1"; //default param
	raplaceWithQuery = "categories=-1";
		
	$scope.first_param = {};
	$scope.first_param.categories = "-1";
	if(typeof $stateParams.categories !== 'undefined'){
		raplaceWithQuery = "categories=" + $stateParams.categories;
		$scope.first_param.categories = $stateParams.categories;
	}
	if(typeof $rootScope.postsQueryParam !== "undefined"){
		raplaceWithQuery = "categories=" +  $rootScope.postsQueryParam ;
	}
	if($scope.first_param.categories=="-1"){
		$scope.first_param.categories = "";
	}

	
	// TODO: postsCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	// TODO: postsCtrl --|-- $scope.addToVirtual
	$scope.addToDbVirtual = function(newItem){
		var is_already_exist = false ;
		// animation loading 
		$ionicLoading.show();
		var virtual_items = []; 
		localforage.getItem("post_bookmark", function(err,dbVirtual){
			if(dbVirtual === null){
				virtual_items = [];
			}else{
				try{
					var last_items = JSON.parse(dbVirtual); 
				}catch(e){
					var last_items = [];
				}
				for(var z=0;z<last_items.length;z++){
					virtual_items.push(last_items[z]);
					if(newItem.categories ==  last_items[z].categories){
						is_already_exist = true;
					}
				}
			}
		}).then(function(value){
			if(is_already_exist === false){
				newItem["_qty"]=1;
				virtual_items.push(newItem);
			}
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		}).catch(function(err){
			virtual_items = [];
			virtual_items.push(newItem);
			localforage.setItem("post_bookmark",JSON.stringify(virtual_items));
			$timeout(function(){
				$ionicLoading.hide();
			},200);
		})
	};
	
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: postsCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/posts/?categories=-1&per_page=15&page=1";
	// TODO: postsCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/posts/?categories=-1&per_page=15&page=1&callback=JSON_CALLBACK";
	// TODO: postsCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_posts = [];
	
	localforage.getItem("data_posts_" + $scope.hashURL, function(err, get_posts){
		if(get_posts === null){
			data_posts =[];
		}else{
			data_posts = JSON.parse(get_posts);
			$scope.data_posts =JSON.parse( get_posts);
			$scope.posts = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_posts[lastPush])){
					$scope.posts.push(data_posts[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_posts === null ){
		data_posts =[];
	}
	if(data_posts.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: postsCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_posts = response.data;
				$scope.data_posts = response.data;
				// TODO: postsCtrl --|---------- set:localforage
				localforage.setItem("data_posts_" + $scope.hashURL, JSON.stringify(data_posts));
				$scope.posts = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_posts[lastPush])){
						$scope.posts.push(data_posts[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: postsCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_posts = data;
						$scope.data_posts = data;
						$ionicLoading.hide();
						// TODO: postsCtrl --|---------- set:localforage
						localforage.setItem("data_posts_" + $scope.hashURL,JSON.stringify(data_posts));
						controller_by_user();
						$scope.posts = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_posts[lastPush])){
								$scope.posts.push(data_posts[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: postsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: postsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_posts.data)){
					if($scope.data_posts.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: postsCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: postsCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_posts = response.data;
			$scope.data_posts = response.data;
			// TODO: postsCtrl --|---------- set:localforage
			localforage.setItem("data_posts_" + $scope.hashURL,JSON.stringify(data_posts));
			$scope.posts = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_posts[lastPush])){
					$scope.posts.push(data_posts[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: postsCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_posts = data;
					$scope.data_posts = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: postsCtrl --|---------- set:localforage
					localforage.setItem("data_posts_"+ $scope.hashURL,JSON.stringify(data_posts));
					$scope.posts = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_posts[lastPush])){
							$scope.posts.push(data_posts[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: postsCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: postsCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_posts === null){
		data_posts = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_posts[lastPush])){
				$scope.posts.push(data_posts[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: postsCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

$ionicConfig.backButton.text("");

var UriListing = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/posts?categories=-1&per_page=15";    
if(!$scope.paging){$scope.paging=1;}
$scope.updatePaging=function(ev){
    if(ev === true){
        $scope.paging++;
    }else{
        if($scope.paging===1){return null;}
        $scope.paging--;
    }
	
	$scope.fetchURL = UriListing + "&page="+$scope.paging;
	$scope.fetchURLp = UriListing +  "&page="+$scope.paging+"&callback=JSON_CALLBACK";
	$scope.hashURL = md5.createHash($scope.fetchURL.replace(targetQuery,raplaceWithQuery));
    $ionicLoading.show({
		template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
	});
    $scope.doRefresh();
    $timeout(function() {
        $scope.scrollTop();
    }, 1000);
}
    
    
    			
		} catch(e){
			console.log("%cerror: %cPage: `posts` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: slide_tab_menuCtrl --|-- 
.controller("slide_tab_menuCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "menu" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: slide_tab_menuCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: slide_tab_menuCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: slide_tab_menuCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `slide_tab_menu` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: user_loginCtrl --|-- 
.controller("user_loginCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = false;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page_builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: user_loginCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: user_loginCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: user_loginCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: user_loginCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			


/** auth login **/
$scope.login_data = {username:"",password:""};
$scope.submitLogin = function(){
    
    // animation loading 
	$ionicLoading.show({
		template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
	});
    
    var username = $scope.login_data.username || "admin" ;
    var password = $scope.login_data.password || "1234" ;
 
    
    var auth_cookie_url = "https://dei-verbum.ayomulai.online//api/user/generate_auth_cookie/?insecure=cool&username="+username+"&password="+password+"&callback=JSON_CALLBACK";
    $sce.trustAsResourceUrl(auth_cookie_url);
    
    $http.jsonp(auth_cookie_url).success(function(resp_auth_cookie, status, headers, config){
        console.log("resp_auth_cookie",resp_auth_cookie);
        
        $scope.login_data.username = "" ;
        $scope.login_data.password = "" ;
        
        if(resp_auth_cookie.user){ 
            $ionicLoading.hide();
            window.localStorage.setItem("login_data",JSON.stringify(resp_auth_cookie));      
            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true
            });
            $ionicHistory.clearHistory();
            $ionicHistory.clearCache();
            $state.go("dei_verbum.user_profile");            
        }else{
            $ionicLoading.hide();
            $ionicPopup.show({
                title: "Something is wrong",
                template: "Please check your username and password.",
                buttons: [{
                    text: "Retry"
                }]
            })
            
        }
    }).error(function (err_auth_cookie, status, headers, config) {
        console.log("err_auth_cookie",err_auth_cookie);
    });
}                 
			
		} catch(e){
			console.log("%cerror: %cPage: `user_login` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: user_profileCtrl --|-- 
.controller("user_profileCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page_builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: user_profileCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: user_profileCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: user_profileCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: user_profileCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			


    $interval(function() {
        
        if(window.localStorage.getItem("login_data") !== "undefined"){
            var login_data = JSON.parse(window.localStorage.getItem("login_data"));
            if(angular.isObject(login_data)){
                $scope.current_user = login_data.user;
            }else{
                window.localStorage.removeItem("login_data");
                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true
                });
                
                $ionicHistory.clearHistory();
                $ionicHistory.clearCache();
                $state.go("dei_verbum.user_login");
            }
        }else{
          
          window.localStorage.removeItem("login_data");
          
          $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
          });
        
          $ionicHistory.clearHistory();
          $ionicHistory.clearCache();
          $state.go("dei_verbum.user_login");
        }
    
    },500);


$scope.showDialog = function(){
    $ionicPopup.show({
        title: "Something is wrong",
        template: "Please check your username and password.",
        buttons: [{
            text: "Retry"
        }]
    })  
}

$scope.logOut = function(){
    window.localStorage.removeItem("login_data");
    
    $ionicHistory.nextViewOptions({
        disableAnimate: true,
        disableBack: true
    });
    
    $ionicHistory.clearHistory();
    $ionicHistory.clearCache();
    $state.go("dei_verbum.user_login");
}

			
		} catch(e){
			console.log("%cerror: %cPage: `user_profile` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: user_registerCtrl --|-- 
.controller("user_registerCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = false;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "page_builder" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: user_registerCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: user_registerCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: user_registerCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// code 

	// TODO: user_registerCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			

            $scope.user_data = {username:"",user_pass:"",email:""};
            $scope.submitRegister = function(){
                
                // animation loading 
            	$ionicLoading.show({
            		template: '<div class="loader"><svg class="circular"><circle class="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/></svg></div>'
            	});   
                                 
                var nonce_url = "https://dei-verbum.ayomulai.online//api/get_nonce/?controller=user&method=register&callback=JSON_CALLBACK";
                $sce.trustAsResourceUrl(nonce_url);
                
                $http.jsonp(nonce_url).success(function(resp_nonce, status, headers, config){
                    console.log("resp_nonce",resp_nonce);
                    
                    var http_params = $scope.user_data ;
                    http_params.nonce = resp_nonce.nonce;
                    var http_header = {params: http_params};
                                        
                    var register_url = "https://dei-verbum.ayomulai.online//api/user/register/?insecure=cool&callback=JSON_CALLBACK";
                    $sce.trustAsResourceUrl(register_url);
                    $http.jsonp(register_url,http_header).success(function(resp_register, status, headers, config){
                            console.log("resp_register",resp_register);

                            if(resp_register.user_id){ 
                                    $ionicLoading.hide();
                                    $ionicPopup.show({
                                        title: "Congratulations",
                                        template: "Your account has been created successfully. Please login.",
                                        buttons: [{
                                            text: "OK",         
                                            onTap: function(e){
                                                
                                                $ionicHistory.nextViewOptions({
                                                    disableAnimate: true,
                                                    disableBack: true
                                                });
                                                
                                                $ionicHistory.clearHistory();
                                                $ionicHistory.clearCache();
                                                $state.go("dei_verbum.user_login");
                    				        },
                                        }]
                                    })
                            }else{
                                    
                                    $ionicLoading.hide();
                                    $ionicPopup.show({
                                        title: resp_register.status,
                                        template: resp_register.error,
                                        buttons: [{
                                            text: "Retry"
                                        }]
                                    })
                                    
                            }
                    }).error(function (err_register, status, headers, config) {
                        console.log("err_register",err_register);
                    });    
                        
                }).error(function (err_nonce, status, headers, config) {
                    console.log("err_nonce",err_nonce);
                });
    
            }     
			
		} catch(e){
			console.log("%cerror: %cPage: `user_register` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})

// TODO: usersCtrl --|-- 
.controller("usersCtrl", function($ionicConfig,$scope,$rootScope,$state,$location,$ionicScrollDelegate,$ionicListDelegate,$http,$httpParamSerializer,$stateParams,$timeout,$interval,$ionicLoading,$ionicPopup,$ionicPopover,$ionicActionSheet,$ionicSlideBoxDelegate,$ionicHistory,ionicMaterialInk,ionicMaterialMotion,$window,$ionicModal,base64,md5,$document,$sce,$ionicGesture,$translate,tmhDynamicLocale){
	
	$rootScope.headerExists = true;
	$rootScope.ionWidth = $document[0].body.querySelector(".view-container").offsetWidth || 412;
	$rootScope.grid64 = parseInt($rootScope.ionWidth / 64) ;
	$rootScope.grid80 = parseInt($rootScope.ionWidth / 80) ;
	$rootScope.grid128 = parseInt($rootScope.ionWidth / 128) ;
	$rootScope.grid256 = parseInt($rootScope.ionWidth / 256) ;
	$rootScope.last_edit = "table (user)" ;
	$scope.$on("$ionicView.afterEnter", function (){
		var page_id = $state.current.name ;
		$rootScope.page_id = page_id.replace(".","-") ;
	});
	if($rootScope.headerShrink == true){
		$scope.$on("$ionicView.enter", function(){
			$scope.scrollTop();
		});
	};
	// TODO: usersCtrl --|-- $scope.scrollTop
	$rootScope.scrollTop = function(){
		$timeout(function(){
			$ionicScrollDelegate.$getByHandle("top").scrollTop();
		},100);
	};
	// TODO: usersCtrl --|-- $scope.toggleGroup
	$scope.toggleGroup = function(group) {
		if ($scope.isGroupShown(group)) {
			$scope.shownGroup = null;
		} else {
			$scope.shownGroup = group;
		}
	};
	
	$scope.isGroupShown = function(group) {
		return $scope.shownGroup === group;
	};
	
	// TODO: usersCtrl --|-- $scope.redirect
	// redirect
	$scope.redirect = function($url){
		$window.location.href = $url;
	};
	
	// Set Motion
	$timeout(function(){
		ionicMaterialMotion.slideUp({
			selector: ".slide-up"
		});
	}, 300);
	// TODO: usersCtrl --|-- $scope.showAuthentication
	$scope.showAuthentication  = function(){
		var form = {"uname":"demo","pwd":"demo"};
		$scope.form = {};
		var authPopup = $ionicPopup.show({
			template: '<input type="text" ng-model="form.uname" placeholder="Username"><input type="password" placeholder="Password" ng-model="form.pwd">',
			title: "Authorization",
			subTitle: "Please use username and password",
			scope: $scope,
			buttons: [
				{text:"Cancel",onTap: function(e){
					$state.go("dei_verbum.dashboard");
				}},
				{text:"<strong>Save</strong>",type:"button-positive",onTap:function(e){
						return $scope.form;
					}},
			],
		}).then(function(form){
			if( angular.isDefined(form)){
				var uname = form.uname || "demo";
				var pwd = form.pwd || "demo";
				var http_value = "Basic " + base64.encode(uname + ":" + pwd);
				$http.defaults.headers.common["X-Authorization"] = http_value;
				localforage.setItem("ima_session", JSON.stringify(http_value));
				$scope.doRefresh();
			}
		},function(err){
		},function(msg){
		});
	};
	
	// set default parameter http
	var http_params = {};
	
	// set HTTP Header 
	var http_header = {
		headers: {
		},
		params: http_params
	};
	var targetQuery = ""; //default param
	var raplaceWithQuery = "";
	
	// TODO: usersCtrl --|-- $scope.splitArray
	$scope.splitArray = function(items,cols,maxItem) {
		var newItems = [];
		if(maxItem == 0){
			maxItem = items.length;
		}
		if(items){
			for (var i=0; i < maxItem; i+=cols) {
				newItems.push(items.slice(i, i+cols));
			}
		}
		return newItems;
	}
	$scope.gmapOptions = {options: { scrollwheel: false }};
	
	var fetch_per_scroll = 1;
	// animation loading 
	$ionicLoading.show();
	
	
	// TODO: usersCtrl --|-- $scope.fetchURL
	$scope.fetchURL = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/users/";
	// TODO: usersCtrl --|-- $scope.fetchURLp
	$scope.fetchURLp = "https://dei-verbum.ayomulai.online//wp-json/wp/v2/users/?callback=JSON_CALLBACK";
	// TODO: usersCtrl --|-- $scope.hashURL
	$scope.hashURL = md5.createHash( $scope.fetchURL.replace(targetQuery,raplaceWithQuery));
	
	
	$scope.noMoreItemsAvailable = false; //readmore status
	var lastPush = 0;
	var data_users = [];
	
	localforage.getItem("data_users_" + $scope.hashURL, function(err, get_users){
		if(get_users === null){
			data_users =[];
		}else{
			data_users = JSON.parse(get_users);
			$scope.data_users =JSON.parse( get_users);
			$scope.users = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_users[lastPush])){
					$scope.users.push(data_users[lastPush]);
				};
			}
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			},200);
		}
	}).then(function(value){
	}).catch(function (err){
	})
	if(data_users === null ){
		data_users =[];
	}
	if(data_users.length === 0 ){
		$timeout(function() {
			var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
			// overwrite HTTP Header 
			http_header = {
				headers: {
				},
				params: http_params
			};
			// TODO: usersCtrl --|-- $http.get
			$http.get(url_request,http_header).then(function(response) {
				data_users = response.data;
				$scope.data_users = response.data;
				// TODO: usersCtrl --|---------- set:localforage
				localforage.setItem("data_users_" + $scope.hashURL, JSON.stringify(data_users));
				$scope.users = [];
				for(lastPush = 0; lastPush < 100; lastPush++) {
					if (angular.isObject(data_users[lastPush])){
						$scope.users.push(data_users[lastPush]);
					};
				}
			},function(response) {
			
				$timeout(function() {
					var url_request = $scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
					// overwrite HTTP Header 
					http_header = {
						headers: {
						},
						params: http_params
					};
					// TODO: usersCtrl --|------ $http.jsonp
					$http.jsonp(url_request,http_header).success(function(data){
						data_users = data;
						$scope.data_users = data;
						$ionicLoading.hide();
						// TODO: usersCtrl --|---------- set:localforage
						localforage.setItem("data_users_" + $scope.hashURL,JSON.stringify(data_users));
						controller_by_user();
						$scope.users = [];
						for(lastPush = 0; lastPush < 100; lastPush++) {
							if (angular.isObject(data_users[lastPush])){
								$scope.users.push(data_users[lastPush]);
							};
						}
					}).error(function(data){
					if(response.status ===401){
						// TODO: usersCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: usersCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
						$timeout(function() {
							alertPopup.close();
						}, 2000);
					}
					});
				}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
				if(angular.isDefined($scope.data_users.data)){
					if($scope.data_users.data.status ===401){
						$scope.showAuthentication();
						return false;
					}
				}
			}, 200);
		});
	
		}, 200);
	}
	
	
	// TODO: usersCtrl --|-- $scope.doRefresh
	$scope.doRefresh = function(){
		var url_request = $scope.fetchURL.replace(targetQuery,raplaceWithQuery);
		// retry retrieving data
		// overwrite http_header 
		http_header = {
			headers: {
			},
			params: http_params
		};
		// TODO: usersCtrl --|------ $http.get
		$http.get(url_request,http_header).then(function(response) {
			data_users = response.data;
			$scope.data_users = response.data;
			// TODO: usersCtrl --|---------- set:localforage
			localforage.setItem("data_users_" + $scope.hashURL,JSON.stringify(data_users));
			$scope.users = [];
			for(lastPush = 0; lastPush < 100; lastPush++) {
				if (angular.isObject(data_users[lastPush])){
					$scope.users.push(data_users[lastPush]);
				};
			}
		},function(response){
			
		// retrieving data with jsonp
			$timeout(function() {
			var url_request =$scope.fetchURLp.replace(targetQuery,raplaceWithQuery);
				// overwrite http_header 
				http_header = {
					headers: {
					},
					params: http_params
				};
				// TODO: usersCtrl --|---------- $http.jsonp
				$http.jsonp(url_request,http_header).success(function(data){
					data_users = data;
					$scope.data_users = data;
					$ionicLoading.hide();
					controller_by_user();
					// TODO: usersCtrl --|---------- set:localforage
					localforage.setItem("data_users_"+ $scope.hashURL,JSON.stringify(data_users));
					$scope.users = [];
					for(lastPush = 0; lastPush < 100; lastPush++) {
						if (angular.isObject(data_users[lastPush])){
							$scope.users.push(data_users[lastPush]);
						};
					}
				}).error(function(resp){
					if(response.status ===401){
						// TODO: usersCtrl --|------------ error:Unauthorized
						$scope.showAuthentication();
					}else{
						// TODO: usersCtrl --|------------ error:Message
						var data = { statusText:response.statusText, status:response.status };
						var alertPopup = $ionicPopup.alert({
							title: "Network Error" + " (" + data.status + ")",
							template: "An error occurred while collecting data.",
						});
					};
				});
			}, 200);
		}).finally(function() {
			$scope.$broadcast("scroll.refreshComplete");
			// event done, hidden animation loading
			$timeout(function() {
				$ionicLoading.hide();
				controller_by_user();
			}, 500);
		});
	
	};
	if (data_users === null){
		data_users = [];
	};
	// animation readmore
	var fetchItems = function() {
		for(var z=0;z<fetch_per_scroll;z++){
			if (angular.isObject(data_users[lastPush])){
				$scope.users.push(data_users[lastPush]);
				lastPush++;
			}else{;
				$scope.noMoreItemsAvailable = true;
			}
		}
		$scope.$broadcast("scroll.infiniteScrollComplete");
	};
	
	// event readmore
	$scope.onInfinite = function() {
		$timeout(fetchItems, 500);
	};
	
	// create animation fade slide in right (ionic-material)
	$scope.fireEvent = function(){
		ionicMaterialInk.displayEffect();
	};
	// code 

	// TODO: usersCtrl --|-- controller_by_user
	// controller by user 
	function controller_by_user(){
		try {
			
$ionicConfig.backButton.text("");			
		} catch(e){
			console.log("%cerror: %cPage: `users` and field: `Custom Controller`","color:blue;font-size:18px","color:red;font-size:18px");
			console.dir(e);
		}
	}
	$scope.rating = {};
	$scope.rating.max = 5;
	
	// animation ink (ionic-material)
	ionicMaterialInk.displayEffect();
	controller_by_user();
})
