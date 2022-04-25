import axios from "axios";
import {
  GET_DOGS,
  FILTER_TEMPERAMENT,
  GET_TEMPERAMENT,
  FILTER_CREATE,
  ORDER_AS,
  ORDER_WEIGHT,
  GET_NAME,
  GET_DETAILS,
} from "./types";

export function getDogs() {
  return async function (dispatch) {
    var json = await axios.get(`http://localhost:3001/dogs`);
    dispatch({
      type: GET_DOGS,
      payload: json.data,
    });
  };
}

export function getTemperament() {
  return async function (dispatch) {
    const temp = await axios.get(`http://localhost:3001/temperament`);
    dispatch({
      type: GET_TEMPERAMENT,
      payload: temp.data,
    });
  };
}

export function createDog(payload) {
  return async function (dispatch) {
    var response = await axios.post(`http://localhost:3001/dogs`, payload);
    return response;
  };
}

export function filterTemperament(temperament) {
  return {
    type: FILTER_TEMPERAMENT,
    payload: temperament,
  };
}

export function filterCreate(payload) {
  return {
    type: FILTER_CREATE,
    payload,
  };
}

export function orderAs(payload) {
  return {
    type: ORDER_AS,
    payload,
  };
}

export function orderWeight(payload) {
  return {
    type: ORDER_WEIGHT,
    payload,
  };
}

export function getName(name) {
  return async function (dispatch) {
    try {
      const json = await axios.get("http://localhost:3001/dogs?name=" + name);
      return dispatch({
        type: GET_NAME,
        payload: json.data,
      });
    } catch (err) {
      console.log(err);
    }
  };
}

export function getDetails(id) {
  return async function (dispatch) {
    const json = await axios.get(`http://localhost:3001/dogs/` + id);
    dispatch({
      type: GET_DETAILS,
      payload: json.data,
    });
  };
}
