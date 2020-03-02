import React from 'react';
import {Link} from 'react-router-dom';

import Logo from '../images/logo_chozas2.png';
import './style.css';
// import PageLoading from '../components/PageLoading';
// import PageError  from '../components/PageError';


class Home extends React.Component {
    // state = {
    //     loading: true,
    //     error: null,
    // };
    render(){
        // if(this.state.loading === true){
        //     return <PageLoading />;
        // }

        // if(this.state.error){
        //     return <PageError error={this.state.error} />
        // }

        return(
            <main className='w-screen h-screen'>
                <div id='inicio'>
                    <div className='p-5' id='imgChozas'>
                        <img className='w-full' src={Logo} alt='Logo' />
                    </div>
                <div>
                    <h1 className='text-center text-white pb-4'>
                        Ramón Chozas S.A
                    </h1>
                </div>
                <div className='text-center'>
                    <Link to='/home/login'  class="bg-teal-400 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full">
                        ¡Acceder!
                    </Link>
                </div>
                </div>
        </main>
    );
  }
}

export default Home;