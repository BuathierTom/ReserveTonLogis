import React, { useState } from "react";
import { useEffect } from "react";
import ApiCall from "../../components/api/ApiCall";

function Room(){
    const [room, setRoom] = useState([]);
    console.log(room);

    useEffect(() => {
        ApiCall().then(data => {
            setRoom(data);
        })

    }
    , []);

    console.log(room.nom);
    return(
        <div className="room">
            {room.map( (room) => (
                <div className="room__container" key={room.id}>
                    <div className="room__container__img">
                        <img src={room.image} alt={room.nom} />
                    </div>
                    <div className="room__container__info">
                        <h2>{room.nom}</h2>
                        <p>{room.description}</p>
                        <p>{room.prix}€</p>
                    </div>
                </div>
            ))}
           
        </div>
    )
}


export default Room;