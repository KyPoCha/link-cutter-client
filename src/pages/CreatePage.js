import React, {useState, useEffect, useContext} from "react";
import {useHttp} from "../hooks/http.hook";
import {AuthContext} from "../context/AuthContext";
import {useHistory} from "react-router-dom";

export const CreatePage = ()=>{
    const history = useHistory();
    const auth = useContext(AuthContext);
    const [link, setLink] = useState("");
    const {request} = useHttp();

    useEffect(()=>{
        window.M.updateTextFields();
    },[]);

    const pressHandler = async (event) => {
        if(event.key === "Enter"){
            try {
                const data = await request("https://link-cutter-kypocha-2-0.herokuapp.com/api/link/generate", "POST", {from: link}, {Authorization: `Bearer ${auth.token}`});
                history.push(`https://link-cutter-kypocha-2-0.herokuapp.com/detail/${data.link._id}`);
            }
            catch (e) {
            }
        }
    }

    return(
        <div className="row">
            <div className=".col.s8.offset-s2" style={{paddingTop: "2rem"}}>
                <div className="input-field ">
                    <input
                        placeholder="Enter the link"
                        id="link"
                        type="text"
                        className="black-input"
                        onChange={e => setLink(e.target.value)}
                        onKeyPress={pressHandler}
                    />
                    <label htmlFor="link">Enter the link</label>
                </div>
            </div>
        </div>
    )
};