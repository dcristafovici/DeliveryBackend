"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.Connection = void 0;
var graphql_1 = require("@nestjs/graphql");
function Connection(GenericClass) {
    var PageInfo = /** @class */ (function () {
        function PageInfo() {
        }
        __decorate([
            graphql_1.Field(function () { return String; }, { nullable: true })
        ], PageInfo.prototype, "startCursor");
        __decorate([
            graphql_1.Field(function () { return String; }, { nullable: true })
        ], PageInfo.prototype, "endCursor");
        __decorate([
            graphql_1.Field(function () { return Boolean; }, { nullable: false })
        ], PageInfo.prototype, "hasPreviousPage");
        __decorate([
            graphql_1.Field(function () { return Boolean; }, { nullable: false })
        ], PageInfo.prototype, "hasNextPage");
        PageInfo = __decorate([
            graphql_1.ObjectType({ isAbstract: true })
        ], PageInfo);
        return PageInfo;
    }());
    var Edge = /** @class */ (function () {
        function Edge() {
        }
        __decorate([
            graphql_1.Field(function () { return GenericClass; }, { nullable: false })
        ], Edge.prototype, "node");
        __decorate([
            graphql_1.Field(function () { return String; }, { nullable: false })
        ], Edge.prototype, "cursor");
        Edge = __decorate([
            graphql_1.ObjectType({ isAbstract: true })
        ], Edge);
        return Edge;
    }());
    var IConnection = /** @class */ (function () {
        function IConnection() {
        }
        __decorate([
            graphql_1.Field(function () { return [Edge]; }, { nullable: false })
        ], IConnection.prototype, "edges");
        __decorate([
            graphql_1.Field(function () { return PageInfo; }, { nullable: false })
        ], IConnection.prototype, "pageInfo");
        IConnection = __decorate([
            graphql_1.ObjectType({ isAbstract: true })
        ], IConnection);
        return IConnection;
    }());
    return IConnection;
}
exports.Connection = Connection;
