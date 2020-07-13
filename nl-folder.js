(function (angular) {
    var folder = angular.module("module.newland.folder", []);
    folder.directive("nlFolder", ["$NLFolderTree", function ($NLFolderTree) {
        return {
            restrict: "EA",
            scope: {
                loadFiles: "&",
                data: "=",
                defaultToggled: "=",
                selected: "&",
                selectedRow: "=",
                dataKey: "@",
                nameKey: "@"
            },
            replace: true,
            template: "<div></div>",
            compile: $compile,
            controller: ["$scope", function ($scope) {
                if (!$scope.nameKey) $scope.nameKey = 'name';
                if (!$scope.dataKey) $scope.dataKey = 'data';
                console.log($scope.nameKey);
                console.log($scope.dataKey);
                if ($scope.loadingRealTime == 'true' || $scope.loadingRealTime === true) {
                    $scope.loadingRealTime = true;
                } else {
                    $scope.loadingRealTime = false;
                }

                $scope.select = function (row) {
                    if (row.active) {
                        row.active = false;
                        $scope.selected({row: undefined});
                        $scope.selectedRow = undefined;
                    } else {
                        if ($scope.selectedRow) $scope.selectedRow.active = false;
                        row.active = true;
                        $scope.selected({'row': row});
                        $scope.selectedRow = row;
                    }
                };
                $scope.changeToggled = function (row) {
                    if (row.fileType == 'folder') {
                        console.log($scope.loadFiles);
                        if (!row.toggled && $scope.loadFiles) {
                            row.data = undefined;
                            row.data = $scope.loadFiles({"row": row});
                        }
                        row.toggled = !row.toggled;
                    }
                }
                $scope.toLoadFiles = function (row) {
                    if ($scope.loadFiles) row.data = $scope.loadFiles(row);
                }
                var d = $scope.defaultToggled;
                $scope.initRowTOG = function (row) {
                    row.toggled = row.toggled == undefined ? (d == undefined ? $NLFolderTree.defaultToggled : d) : row.toggled;
                };
            }]
        };
        function $compile(elem, attrs) {
            var tar = $(elem);
            for (var i = 0; i < $NLFolderTree.maxDepth; i++) {
                var ul = $("<ul ng-if='" + (i == 0 ? true : ("row" + (i-1) + "[dataKey]")) +"'>" +
                    "   <li ng-repeat='row" + i + " in " + (i == 0 ? "data" : "row" + (i-1) + "[dataKey]") +"' ng-class=\"{'active':(row" + i + ".active), 'toggled': row" + i + ".toggled}\" ng-init='initRowTOG(row" + i + ")'>" +
                    "       <i class='fa' " +
                    "           ng-class=\"{'fa-folder-o': (!row"+i+".toggled), 'fa-folder-open-o': (row"+i+".toggled)}\" " +
                    "           ng-click='changeToggled(row"+i+")'></i>" +
                    "       <a href='javascript:;' ng-click='select(row"+i+")' ng-dblclick='changeToggled(row"+i+")'><span>{{row"+i+"[nameKey]}}</span></a>" +
                    "   </li>" +
                    "</ul>");
                tar.append(ul);
                tar = ul.children("li");
            }
        }
    }]);

    folder.provider("$NLFolderTree", function treeProvider() {
        this.maxDepth = 32;
        this.defaultToggled = true;
        this.$get = function () {
            return new treeProvider();
        }
    });
})(angular);
