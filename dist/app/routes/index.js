"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const router = (0, express_1.Router)();
const routes = [
    {
        path: '/users',
        route: user_route_1.userRouter,
    },
    {
        path: '/auth',
        route: auth_route_1.authRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
