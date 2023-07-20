//hacer un carrito que tenga carrito
import "./menu.css";
import { useState } from "react";
import { Link, Route, Routes, useLocation } from "react-router-dom";
import image from "/assets/img/user.webp";
import steam from "/assets/img/steam.png";
import { AnimatePresence, motion } from "framer-motion";

function User() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: .5 }}
      className="user"
    >
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
    </motion.div>
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
  const filtrado = (ind) => {
    setCar(car.filter((e, indi) => indi !== ind));
    car.map((e) => setCarroCont(carroCont - e.precio)); //esto es el precio total
    setItemCont(itemCont - 1); //esto es el contador
  };

  const ventanaAncho = window.innerWidth < 500;
  const variantes = {
    initialSmall: {
      height: "20%",
      opacity: 0,
    },
    small: {
      height: "80%",
      opacity: 1,
    },
    exitSmall: {
      height: "20%",
      opacity: 0,
    },

    initialRegular: {
      opacity: 0,
      y: 30,
    },
    regular: {
      opacity: 1,
      y: 0,
    },
    exitRegular: {
      y: 30,
      opacity: 0,
    },
  };

  return (
    <motion.div
      className="carro-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        initial={ventanaAncho ? "initialSmall" : "initialRegular"}
        variants={variantes}
        animate={ventanaAncho ? "small" : "regular"}
        exit={ventanaAncho ? "exitSmall" : "exitRegular"}
        transition={{ duration: .7 }}
        className="carrito"
      >
        <div className="carrito-primero">
          <span className="lineaCarrito"></span>
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
                    //aqui falta arreglar la animacion no se como hacerlo
                    <motion.div
                      key={indice}
                      layout
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                  
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
                    </motion.div>
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
      </motion.div>
    </motion.div>
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

//aqui routeres lo separe por problemas con useLocation

export default function App() {
  const [data, setData] = useState({
    nombre: "chicken",
    precio: 34,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./assets/img/food3.png",
  });
  const [bolean, setBolean] = useState(false);
  const [car, setCar] = useState([]); //array de listas
  const [cont, setCont] = useState(0); //contador de notificacion
  const [carroCont, setCarroCont] = useState(0); //precio de todoItem
  const [itemCont, setItemCont] = useState(0); //contador de items
  //cada vez que se de click en "ver" se llama a la funcion handle
  const handle = (dat) => {
    setData(dat);
    //quiero que cuando se haga click en "ver" haya una animacion
    //de opacity (ya se logro con framer motion)
    /*cada que se de click en ver */
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


    //el de abajo es el precio total de todos los productos
    a.map((e) => setCarroCont(carroCont + e.precio));
    setItemCont(itemCont + 1); //el de aqui cuenta cuantos items hay en el carrito

    setCont(cont + 1); //contador de notificacion
  };
  const location = useLocation();
  return (
    <>
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
        <motion.div
          className="container"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          key={data.src}
        >
          <div className="container-left">
            <div className="container-image1">
              <img src={steam} alt="" />
            </div>
            <h1>foodbar</h1>
            <div
              className="container-image"
            >
              <img
                src={data.src}
                alt="error"
              />
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
        </motion.div>
        <div className="footer">
          <Card data={handle}></Card>
        </div>
      </div>
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
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
      </AnimatePresence>
    </>
  );
}

function Card({ data }) {
  const card = [{
    nombre: "chicken",
    precio: 34,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./assets/img/food4.png",
    id:1
  }, {
    nombre: "cordero",
    precio: 58,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food2.png",
    id:2
  }, {
    nombre: "res",
    precio: 11,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food3.png",
    id:3
  }, {
    nombre: "pescado",
    precio: 16,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food4.png",
    id:4
  }, {
    nombre: "cabrito",
    precio: 14,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food5.png",
    id:5
  }, {
    nombre: "papas",
    precio: 24,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food6.png",
    id:6
  }, {
    nombre: "alitas",
    precio: 22,
    desc: "lorem ipsum dolor aismet",
    puntuacion: 3.4,
    src: "./src/assets/img/food7.png",
    id:7
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
