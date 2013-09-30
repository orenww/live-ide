vStudio.services.factory('VqlService', function($http, $q) {
	
	// the app descriptor json fetched from the server
	var data = {};
	// reference to nodes presented in tree view
	var treeData = [];
	// tree map of the (vql) leaf nodes
	var map = {};

	var param;
	var promise = {};
	var getData = function() {
		if (!jQuery.isEmptyObject(promise)){
			return promise;
		}
		// $http returns a promise, which has a then function, which also returns a promise
		promise = $http.get('mock/app.descriptor.json').then(function (response) {
			// The then function here is an opportunity to modify the response
			data = response.data;

			// save the first object
			if (data.id) {
				treeData.push(data);
			}

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
		console.log('data saved!!!!!', data);
		return;

		$http.post('/someUrl', data).then(function(result){
			console.log('handle the result', result);
		});
	}

	var currentNode = {
		node: {},
		isAttr: false,
		attrKey: ''
	};
	var setSelectedNode = function(newNode) {
	    currentNode.node = newNode;
	}

	var getSelectedNode = function() {
	    return currentNode;
	}	

	var getSelectionData = function(){
		return getSelectedNode().vqls.dataSelection;
	}

	var selectNodeById = function (id,prop) {
		if (!id) {
			return;
		}

		var node = getById(id);

		// handle property leaf selection
		if (angular.isDefined(prop)) {
        	// select the selected node
			// node.attrSelected = prop;
			getSelectedNode().attrKey = prop;
			getSelectedNode().isAttr = true;
			selectNode(node);
			return;
		}

		// Mark the node as the selected one
		// node.selected = 'selected';
		// node.attrSelected = undefined;	
		getSelectedNode().isAttr = false;
		getSelectedNode().attrKey = '';

		selectNode(node);
	}   

	var selectNode = function(node){
		// var data = getTreeData();
		// if (data.selectedNode) {
		// 	// Nullify the previous selected node
		// 	data.selectedNode.selected = undefined;
		// 	if (data.selectedNode.id !== node.id) {
		// 		data.selectedNode.attrSelected = undefined;
		// 	}
		// }

		// Set the selected node
		// data.selectedNode = node;
		
		currentNode.node = node;
	}

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
	}
});