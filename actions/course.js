import axios from 'axios'
import * as types from '../constants/ActionTypes'
import { makeActionCreator } from './util'

/**
 * Creating a new course
 */
const createCourseRequest = makeActionCreator(types.CREATE_COURSE_REQUEST, 'course')
const createCourseSuccess = makeActionCreator(types.CREATE_COURSE_SUCCESS, 'course')
const createCourseFailure = makeActionCreator(types.CREATE_COURSE_FAILURE, 'data')

export function createCourse(course) {
  return (dispatch) => {
    dispatch(createCourseRequest(course))

    return axios.post('/api/courses', {
      name: course.name,
    }).then(
      res => dispatch(createCourseSuccess(res.data)),
      (err) => {
        console.error(err)
        dispatch(createCourseFailure(err))
      },
    )
  }
}

/**
 * Loading all courses
 */
export const fetchCoursesRequest = makeActionCreator(types.FETCH_COURSES.REQUEST)
const fetchCoursesSuccess = makeActionCreator(types.FETCH_COURSES.SUCCESS, 'courses')
const fetchCoursesFailure = makeActionCreator(types.FETCH_COURSES.FAILURE, 'data')

export function fetchCourses() {
  return (dispatch) => {
    dispatch(fetchCoursesRequest())

    return axios.get('/api/courses')
      .then(
        res => dispatch(fetchCoursesSuccess(res.data)),
        (err) => {
          console.error(err)
          dispatch(fetchCoursesFailure(err))
        },
      )
  }
}

/**
 * Loading a specific course
 */
export const fetchCourseRequest = makeActionCreator(types.FETCH_COURSE_REQUEST, 'courseId')
const fetchCourseSuccess = makeActionCreator(types.FETCH_COURSE_SUCCESS, 'courseId', 'course')
const fetchCourseFailure = makeActionCreator(types.FETCH_COURSE_FAILURE, 'data')

export function fetchCourse(courseId) {
  return (dispatch) => {
    dispatch(fetchCourseRequest(courseId))

    return axios.get(`/api/courses/${courseId}`)
      .then(
        res => dispatch(fetchCourseSuccess(courseId, res.data)),
        (err) => {
          console.error(err)
          dispatch(fetchCourseFailure(err))
        },
      )
  }
}

/**
 * Add a user as staff for a course
 */
const addCourseStaffRequest = makeActionCreator(types.ADD_COURSE_STAFF.REQUEST, 'courseId', 'netid', 'name')
const addCourseStaffSuccess = makeActionCreator(types.ADD_COURSE_STAFF.SUCCESS, 'courseId', 'user')
const addCourseStaffFailure = makeActionCreator(types.ADD_COURSE_STAFF.FAILURE, 'data')

export function addCourseStaff(courseId, netid, name) {
  return (dispatch) => {
    dispatch(addCourseStaffRequest(courseId, netid, name))

    return axios.post(`/api/courses/${courseId}/staff`, {
      netid,
      name,
    }).then(
      res => dispatch(addCourseStaffSuccess(courseId, res.data)),
      (err) => {
        console.error(err)
        dispatch(addCourseStaffFailure(err))
      },
    )
  }
}
