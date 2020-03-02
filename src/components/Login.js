import React from 'react';

import './style.css';
import Navbar from './Navbar';

function Login(){
    return (
    <React.Fragment>

    <Navbar />
     <main className='h-screen w-screen'>
        <div className="w-full max-w-xs">
            <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="username">
                    Usuario
                </label>
                <input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Usuario"/>
            </div>
            <div class="mb-6">
                <label className="block text-gray-700 text-sm font-bold mb-2" for="password">
                    Contraseña
                </label>
                <input className="shadow appearance-none border border-red-500 rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="Ingrese Contraseña"/>
                    <p className="text-red-500 text-xs italic">Ingrese Contraseña.</p>
            </div>
            <div className="flex items-center justify-between">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                    Iniciar Sesión
                </button>
            </div>
        </form>
    </div>
     </main>
    </React.Fragment>
    )
}

export default Login;