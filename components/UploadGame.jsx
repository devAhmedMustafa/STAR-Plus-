"use client"

import "@styles/Inputs.css";
import axios from "axios";
import { useState, useRef } from "react";
import "@styles/FileUpload.css";
import "@styles/UploadBtn.css";
import { add_game } from "@/utils/axios_games";

export default function UploadGame(){

    const [inputs, setInputs] = useState({})
    const [cover, setCover] = useState();
    const [trailer, setTrailer] = useState();
    const [genres, setGenres] = useState([]);

    const [gameFile, setGameFile] = useState();
    const [fileUploaded, setFileUploaded] = useState(false);

    const ChangeHandler = (e)=>{
        const name = e.target.name;
        const value = e.target.value;

        setInputs(values=> ({...values, [name]:value}))
    }
    const ImageHandler = (e)=>{
        setCover(URL.createObjectURL(e.target.files[0]));
    }

    const VideoHandler = (e)=>{
        setTrailer(URL.createObjectURL(e.target.files[0]));
    }

    const SubmitHandler = (e)=>{
        e.preventDefault();
        const cover_file = e.target.cover.files[0];
        const trailer_file = e.target.trailer.files[0];
        const game_file = e.target.game.files[0];

        const form = new FormData();
        form.append('name', inputs.name);
        form.append('file', cover_file);
        form.append('file', trailer_file);
        form.append('file', game_file);
        form.append('desc', inputs.desc);
        form.append('genres', genres);

        add_game(form).then(res=>console.log(res.data));
    }

    const AddGenre = ()=>{

        const genre = document.querySelector('#genre').value;
        setGenres([...genres, genre]);
        console.log(genres)
        document.querySelector('#genre').value = '';
    }

    const UploadGameFile = ()=>{
        setFileUploaded(true);
    }

    return (
        <form onSubmit={SubmitHandler} className="flex justify-between" id="game-form">
            
            <div className="flex flex-col gap-2 max-w-[50%]">

                <div className="textInputWrapper w-[200px]">
                    <input onChange={ChangeHandler} placeholder="Name" type="text" name="name" className="textInput"/>
                </div>

                <div className="textInputWrapper w-[400px]">
                    <input onChange={ChangeHandler} placeholder="Description" type="text" name="desc" className="textInput"/>
                </div>

                <div className="flex gap-4 items-center">
                    <GenreInput/>
                    <button type="button" onClick={AddGenre}>
                        <i className="fa-solid fa-circle-plus text-3xl"></i>
                    </button>
                    <div className="">
                    {genres.map((g)=>{
                        <div className="border-2 border-[#33ce5973] rounded-full px-3 py-1 bg-[#00000033] focus:outline-none">
                            <span>{g}</span>
                            <button className="absolute top-0 right-0">
                                <i className="fa-solid fa-circle-xmark text-red-700"></i>
                            </button>
                        </div>
                    })}
                    </div>
                </div>

                <>
                    <label htmlFor="cover" className="Btn"> <i className="fa-solid fa-file-circle-plus"></i> Upload Cover</label>
                    <input type="file" className="hidden" id="cover" name="cover" onChange={ImageHandler} accept="image/*"/>
                </>

                <>
                    <label htmlFor="trailer" className="Btn"> <i className="fa-solid fa-file-circle-plus"></i> Upload Trailer</label>
                    <input type="file" className="hidden" id="trailer" name="trailer" onChange={VideoHandler} accept="video/*"/>
                </>

                <div className="flex items-center gap-4">

                    <label htmlFor="game" className="Btn"> <i className="fa-solid fa-file-circle-plus"></i> Upload Game</label>

                    <input type="file" className="hidden" id="game" name="game" accept=".zip,.rar,.7zip" onChange={UploadGameFile}/>

                    {fileUploaded && <i className="fa-solid fa-circle-check text-green-500"></i>}
                    
                </div>

                <button className="pinBtn">
                    <span className="IconContainer"> 
                        <i className="fa-solid fa-cloud"></i>
                    </span>
                    <p className="text">Upload</p>
                </button>
                
            </div> 
            
            <div className="w-[25%]">
                <img src={cover}/>
            </div>

            { trailer&&

            <video className="w-[25%]">
                <source src={trailer}/>
            </video>

            }

        </form>
    )
}

function GenreInput(){
    return (
        <input type="text" placeholder="Genre" id="genre" className="w-[160px] border-2 border-[#2e2e2e] rounded-full px-3 py-1 bg-[#00000033] focus:outline-none"/>
    )    
}