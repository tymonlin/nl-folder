(function (angular) {
    var folder = angular.module("module.newland.folder", ["nl-tree"]);
    folder.directive("nlFolder", function () {
        return {
            restrict: "EA",
            scope: {
                folderTreeData: "=",
                selectedFolder: "&"
            },
            replace: true,
            template: "<nl-tree data=\"folderTreeData\" class=\"nltree\" selected-row=\"selectedFolder\" max-level=\"32\"></nl-tree>",
            controller: ["$scope", function ($scope) {

            }]
        };
    });
})(angular);