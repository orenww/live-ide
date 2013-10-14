vStudio.services.factory('VqlService', function($http, $q, Constants, ChangesTracker) {
	
	// the app descriptor json fetched from the server
	var data = {};
	// reference to nodes presented in tree view
	var treeData = [];
	// tree map of the (vql) leaf nodes
	var map = {};

	//var url = 'mock/app.descriptor.json';
	//var url = 'http://localhost:8080/AppDescriptorServlet?appId=app-1'; 
	var url = Constants.APP_URL;

	var param;
	var promise = {};
	var getData = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get(url).then(function (response) {
			// The then function here is an opportunity to modify the response
			data = response.data;

			// save the first object
			if (data.id) {
				treeData.push(data);
			}

			// build the initial map
			getMap(treeData);

			return treeData;
		});
		// Return the promise to the controller
		return promise;
	};

	var getTreeData = function () {
		return treeData;
	}

	// creates map of the treeData array for vql's leaf nodes only
	function createMap(item){

		if(!item.hasOwnProperty("children") || item.children.length == 0){
			map[item.id] = item;
			return map;
		}

		if (item.hasOwnProperty('id')) {
			map[item.id] = item;
		}
		
		for(var i = 0; i < item.children.length; i++){
			createMap(item.children[i]);
		}		
	};


	var getMap = function() {
		if(jQuery.isEmptyObject(map)){
			for(var i = 0; i < treeData.length; i++){
				createMap(treeData[i]);
			}			
			ChangesTracker.init(map);
		}

		return map;
	};

	var getById = function(id) {
		if(jQuery.isEmptyObject(map)){
			map = getMap();
		}

		return id ? map[id] : {};
	};

	var getParam = function(){
		return param;
	}

	// post the data object to the server
	var saveCode = function () {
		// console.log('data saved!!!!!', angular.toJson(data));
		// return;

		$http.post(url, angular.toJson(data)).then(function(result){
			console.log('data saved!', result);
		});
	}

	var currentNode = {
		node: {},
		isAttr: false,
		attrKey: ''
	};
	var setSelectedNode = function(newNode, key) {
	    var isAttr = false;
	    var attrKey = '';

	    selectNode(newNode);

	    // checks if the selected node is a property of the node's 'vqls'
	    if (key && key.length) {
			isAttr = true;
			attrKey = key;
	    }
	    currentNode.isAttr = isAttr;
	    currentNode.attrKey = attrKey;
	}

	var getSelectedNode = function() {
	    return currentNode;
	}	

	var getSelectionData = function(){
		var node = getSelectedNode();

		if (node.vql){
			return no.vqls.dataSelection;			
		}else{
			return "";
		}
	}

	var selectNodeById = function (id,prop) {
		if (!id) {
			return;
		}

		var node = getById(id);

		// handle property leaf selection
		if (angular.isDefined(prop)) {
        	// select the selected node
			getSelectedNode().attrKey = prop;
			getSelectedNode().isAttr = true;
			selectNode(node);
			return;
		}

		getSelectedNode().isAttr = false;
		getSelectedNode().attrKey = '';

		selectNode(node);
	}   

	var selectNode = function(node){
		currentNode.prevNode = currentNode.node;
		currentNode.node = node;
	}

	// return a unique array of all params in 'inParams'
	var getParams = function() {
		var tree = getTreeData();
		var params = {}
		// creates a copy of the main app params
		angular.copy(tree[0] ? tree[0].defaultParams : {} , params);

		// params should be used as a context
		function extractParams(node) {
			// go over inParams
			angular.forEach(node.inParams, function(val, key){
				params[val] = val;
			});

			// iterate on each node
			if (node.children) {
				angular.forEach(node.children, function(node){
					extractParams(node);
				});
			}
		}

		angular.forEach(tree, function(val, key){
			extractParams(val);
		});
		return Object.keys(params);
	};

	getData();

	// expose the service
	return {
		getTreeData: getTreeData
		, getData: getData
		, getById: getById
		, getMap:getMap
		, getParam:getParam
		, save: saveCode
		, setSelectedNode: setSelectedNode
		, getSelectedNode: getSelectedNode
		, selectNodeById: selectNodeById
		, getSelectionData: getSelectionData
		, getParams: getParams
	}
});