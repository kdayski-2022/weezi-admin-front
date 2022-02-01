// in src/customRoutes.js
import * as React from "react";
import { Route } from 'react-router-dom';
import CatalogUserImport from '../pages/catalogUserImport';
import CourseFileTask from '../pages/courseFileTask';
const customRoutes = [
    <Route exact path="/catalog_user_import" component={CatalogUserImport} />,
    <Route exact path="/course_file_task" component={CourseFileTask} />,
]
export default customRoutes;