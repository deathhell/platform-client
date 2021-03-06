module.exports = [
    '$scope',
    '$rootScope',
    '$routeParams',
    '$translate',
    'multiTranslate',
    'RoleHelper',
    'TagEndpoint',
    'Notify',
    '_',
function (
    $scope,
    $rootScope,
    $routeParams,
    $translate,
    multiTranslate,
    RoleHelper,
    TagEndpoint,
    Notify,
    _
) {
    $translate('tag.edit_tag').then(function (title) {
        $scope.title = title;
        $rootScope.$emit('setPageTitle', title);
    });

    $scope.types = multiTranslate(['tag.types.category', 'tag.types.status']);
    $scope.roles = RoleHelper.roles();

    $scope.tag = TagEndpoint.get({id: $routeParams.id});
    $scope.processing = false;

    $scope.saveTag = function (tag) {
        $scope.processing = true;
        TagEndpoint.update({id: $routeParams.id}, tag, function () {
            $rootScope.goBack();
        }, function (errorResponse) { // error
            Notify.showApiErrors(errorResponse);
            $scope.processing = false;
        });
    };
}];
