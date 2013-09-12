vStudio.directives
    .directive('bsDropdown', function ($compile) {
        return {
            restrict: 'E',
            scope: {
                items:          '=dropdownData',
                selectedItem:   '=preselectedItem',
                doSelect:       '&selectVal',
                handleClick:    '=handleClick'              
            },
            link: function (scope, element, attrs) {

                // scope.items = [{id: 1,name: "Low"}, {id: 2,name: "Normal"}, {id: 3,name: "High"},
                //                  {id: 4,name: "Urgent"}, {id: 5,name: "Immediate"}];
                //scope.selectedItem = 3;



                var html = '';
                switch (attrs.menuType) {
                    case "button":
                        html += '<div class="btn-group">' + 
                                    '<button class="btn button-label btn-info" data-ng-click="buttonClicked(item)"">Action</button>' +
                                    '<button class="btn btn-info dropdown-toggle" data-toggle="dropdown">' + 
                                        '<span class="caret"></span>' + 
                                    '</button>';
                        break;
                    default:
                        html += '<div class="dropdown"><a class="dropdown-toggle" role="button" data-toggle="dropdown"  href="javascript:;">Dropdown<b class="caret"></b></a>';
                        break;
                }

                        html +=     '<ul class="dropdown-menu">'+
                                        '<li ng-repeat="item in items">'+
                                            '<a tabindex="-1" data-ng-click="selectVal(item)">{{item.name}}</a>' + 
                                        '</li>' + 
                                    '</ul>'+
                                '</div>';

                element.append($compile(html)(scope));
                
                for (var i = 0; i < scope.items.length; i++) {
                    if (scope.items[i].id === scope.selectedItem) {
                        scope.bSelectedItem = scope.items[i];
                        break;
                    }
                }
                scope.selectVal = function (item) {
                    scope.bSelectedItem = item;
                    switch (attrs.menuType) {
                        case "button":
                            $('button.button-label', element).html(item.name);
                            break;
                        default:
                            $('a.dropdown-toggle', element).html('<b class="caret"></b> ' + item.name);
                            break;
                    }

                    scope.doSelect({
                        selectedVal: item.id
                    });
                };
                scope.selectVal(scope.bSelectedItem);

                scope.buttonClicked = function () {
                    console.log(scope.bSelectedItem);
                    scope.handleClick(scope.bSelectedItem);
                }
            }
        };
});