"use client";

import axios from 'axios';
import { POSTS, API_URL } from './constants';


export async function getAllPosts () {
   const {data} = await axios.get(API_URL + POSTS);

   return data;
}

