"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_route_1 = require("../module/user/user.route");
const auth_route_1 = require("../module/auth/auth.route");
const lesson_route_1 = require("../module/lesson/lesson.route");
const vocabulary_route_1 = require("../module/vocabulary/vocabulary.route");
const stats_route_1 = require("../module/stats/stats.route");
const tutorial_route_1 = require("../module/tutorial/tutorial.route");
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
    {
        path: '/lesson',
        route: lesson_route_1.lessonRouter,
    },
    {
        path: '/vocabulary',
        route: vocabulary_route_1.vocabularyRouter,
    },
    {
        path: '/stats',
        route: stats_route_1.statsRouter,
    },
    {
        path: '/tutorial',
        route: tutorial_route_1.tutorialRouter,
    },
];
routes.forEach((route) => router.use(route.path, route.route));
exports.default = router;
