import React, {useCallback, useContext, useEffect, useState} from "react";
import {useParams} from "react-router-dom";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailPage = ()=>{
    const [link, setLink] = useState(null);
    const linkId = useParams().id;
    const {request, loading} = useHttp();
    const {token} = useContext(AuthContext);

    const getLink = useCallback(async ()=>{
        try{
            const fetched = await request(`https://link-cutter-kypocha-2-0.herokuapp.com/api/link/${linkId}`, "GET", null, {
                Authorization: `Bearer ${token}`
            });
            setLink(fetched)
        }
        catch (e){}
    },[token, linkId, request]);

    useEffect( ()=>{
        getLink();
    },[getLink]);

    if(loading){
        return <Loader></Loader>
    }

    return(
        <>
            {!loading && link && <LinkCard link={link}/>}
        </>
    )
};