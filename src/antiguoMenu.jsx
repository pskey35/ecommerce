//hacer un carrito que tenga carrito
import "./carrito.css";
import { useState } from "react";
import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import image from "./assets/img/user.webp";
import steam from "./assets/img/steam.png";
function User() {
  return (
    <div className="user">
      <div className="user-container">
        <Link to="/" className="user-salir">salir</Link>
        <div className="user-img">
          <img src={image} alt="" />
        </div>
        <div className="user-inputs">
          <div>
            <input placeholder="Email"></input>
          </div>
          <div>
            <input placeholder="Numero de tarjeta"></input>
          </div>
          <div className="input-3">
            <input placeholder="12/2024"></input>
            <input type="text" placeholder="CVV" />
          </div>
          <input type="submit" value="agregar tarjeta" />
        </div>
      </div>
    </div>
  );
}

function Carrito(
  {
    setBolean,
    bolean,
    car,
    carroCont,
    itemCont,
    setCar,
    setCarroCont,
    setItemCont,
  },
) {
  const vista = (e) => {
    //   console.log(bolean);
  };
  const filtrado = (ind) => {
    setCar(car.filter((e, indi) => indi !== ind));
    car.map((e) => setCarroCont(carroCont - e.precio));
    setItemCont(itemCont - 1);
  };
  return (
    <div className="carro-container" onClick={vista}>
      <div className="carrito">
        <div className="carrito-primero">
          <span class="lineaCarrito"></span>
          <Link to="/" className="link-carrito">
            <button onClick={() => setBolean(!bolean)}>retro</button>
          </Link>
        </div>
        {itemCont > 0
          ? (
            <>
              <div className="carrito-caja">
                {car.map((valor, indice) => {
                  return (
                    <div
                      key={indice}
                      className={`item-container item-${indice}`}
                    >
                      <div className="item">
                        <div className="primero">
                          <p>
                            {valor.nombre}
                          </p>
                          <div className="carrito-image">
                            <img src={valor.src} alt="" />
                          </div>
                        </div>
                        <div className="segundo">
                          <p className="segundo-desc">
                            {valor.desc}
                          </p>
                        </div>
                        <div className="tercero">
                          <p>
                            ${valor.precio}
                          </p>
                        </div>
                        <div
                          style={{ padding: "10px" }}
                          className="cuarto"
                          onClick={() => filtrado(indice)}
                        >
                          X
                        </div>
                      </div>

                      <div className="caja-linea">
                        <span className="linea">
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className="carrito-bottom">
                <p>
                  <span>precio total:</span>
                  <span>{carroCont}</span>
                </p>

                <p>
                  <span>cantidad de productos:</span>
                  <span>{itemCont}</span>
                </p>
              </div>
            </>
          )
          : <div className="carrito-alert">agrega algo al carrito</div>}
      </div>
    </div>
  );
}
//const a = [];
/*
document.body.addEventListener("click",e=>{
  if(e.target.className !== "carrito"){
   // alert("borrando")
    console.log(e.target.parentElement)
  }
})*/

export default function App() {
  const [data, setData] = useState({
    nombre: "chicken",
    precio: 34,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food1.png",
  });
  const [bolean, setBolean] = useState(false);
  const [car, setCar] = useState([]); //array de listas
  const [cont, setCont] = useState(0); //contador de notificacion
  const [carroCont, setCarroCont] = useState(0); //precio de todoItem
  const [itemCont, setItemCont] = useState(0); //contador de items
  //cada vez que se de click en "ver" se llama a la funcion handle
  const handle = (dat) => {
    setData(dat);
  };

  //aqui reacciona cada ve que se da click en "carritoNotificacion"
  const carritoBoton = () => {
    setBolean(!bolean);
    setCont(0);
  };

  //aqui reacciona cada vez que se haga click en "order now"
  const carrito = () => {
    const a = [...car];
    a.push(data);
    setCar(a);

    console.log(car);
    //el de abajo es el precio total de todos los productos
    a.map((e) => setCarroCont(carroCont + e.precio));
    setItemCont(itemCont + 1); //el de aqui cuenta cuantos items hay en el carrito
    console.log(itemCont);
    setCont(cont + 1); //contador de notificacion
  };
  return (
    <BrowserRouter>
      <div className="header">
        <div className="right">
          <Link to="carrito" onClick={carritoBoton}>
            <p>
              <span>carrito</span>
              {cont > 0 ? <span className="carrito-cont">{cont}</span> : ""}
            </p>
          </Link>
          <Link to="user">
            <p>user</p>
          </Link>
        </div>
      </div>
      <div className="bod">
        <div className="container">
          <div className="container-left">
            <div className="container-image1">
              <img src={steam} alt="" />
            </div>
            <h1>foodbar</h1>
            <div className="container-image">
              <img src={data.src} alt="error" />
            </div>
          </div>
          <div className="container-right">
            <h1>{data.nombre}</h1>
            <div className="texto">
              {data.desc}
            </div>
            <div className="right-tercero">
              <div className="right-precio">${data.precio}</div>
              <div className="right-boton" onClick={carrito}>order now</div>
            </div>
          </div>
        </div>
        <div className="footer">
          <Card data={handle}></Card>
        </div>
      </div>
      <Routes>
        <Route path="/"></Route>
        <Route
          path="carrito"
          element={(
            <Carrito
              car={car}
              setBolean={setBolean}
              bolean={bolean}
              carroCont={carroCont}
              itemCont={itemCont}
              setItemCont={setItemCont}
              setCar={setCar}
              setCarroCont={setCarroCont}
            />
          )}
        >
        </Route>
        <Route path="user" element={<User></User>}>
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Card({ data }) {
  const card = [{
    nombre: "chicken",
    precio: 34,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food1.png",
  }, {
    nombre: "cordero",
    precio: 58,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food2.png",
  }, {
    nombre: "res",
    precio: 11,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food3.png",
  }, {
    nombre: "pescado",
    precio: 16,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food4.png",
  }, {
    nombre: "cabrito",
    precio: 14,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food5.png",
  }, {
    nombre: "papas",
    precio: 24,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food6.png",
  }, {
    nombre: "alitas",
    precio: 22,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food7.png",
  }];

  return (
    <div className="card-container">
      {card.map((valor, indice) => {
        const a = {
          nombre: valor.nombre,
          precio: valor.precio,
          desc: valor.desc,
          puntuacion: valor.puntuacion,
          src: valor.src,
        };
        return (
          <div className="card" key={indice}>
            <div className="card-primero">
              <div className="image">
                <img src={valor.src} alt="error" />
              </div>
              <div className="precio">
                ${valor.precio}
              </div>
            </div>
            <div className="card-segundo">
              <p>{valor.nombre}</p>
              <p>plato</p>
            </div>
            <div className="card-tercero">
              <p>{valor.puntuacion}</p>
              <button onClick={() => data(a)}>ver</button>
            </div>
          </div>
        );
      })}
    </div>
  );
}
