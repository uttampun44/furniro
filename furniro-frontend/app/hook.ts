import {useSelector, useDispatch} from "react-redux"
import type{AppDispatch, RootState} from "../store/Store";

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()