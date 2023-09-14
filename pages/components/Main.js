import { useEffect, useState } from "react";
import { ethers } from 'ethers';
import Contract_ABI from '../PSCL.json'
import urls from '../../public/urls';
import styles from '../../styles/Home.module.css'

const contractAddress = "0x8b3a7D0e9d59d9D21e26cf6De8D9D5A88C81DD8A"

const Main = ({accounts = [], setAccounts}) => {
    const isConnected = accounts.length > 0 && Boolean(accounts[0]);

    // 入力フォーム
    const [number, setNumber] = useState("");
    const [url, setUrl] = useState("");
  
    const handleSubmit = async (event) => {
        event.preventDefault();
  
        try {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();
            const contract = new ethers.Contract(contractAddress, Contract_ABI, signer);

            const ownerAddress = await contract.ownerOf(number);
            if (ownerAddress.toLowerCase() === accounts[0].toLowerCase()) {
                setUrl(urls[number]);
            } else {
                setUrl("");
                alert("あなたはこのシープのオーナーではありません");
            }
        } catch (error) {
            console.error(error);
            setUrl("");
            alert("ウォレットを接続して保有シープのトークンIDを入力してください");
        }
  
        setNumber("");
    };

    return (
        <div>
            <h1 className={styles.title}>PARTY SHEEP WORLD</h1>
            <div className={styles.main}>
                <div className={styles.container}>
                    <img src="/sheep.png" alt="Sheep" />
                    <form className={styles.form} onSubmit={handleSubmit}>
                        <input 
                            className={styles.inputBox}
                            type="number" 
                            placeholder="トークンIDを入力"
                            value={number} 
                            onChange={(e) => setNumber(e.target.value)} 
                        />
                        <input className={styles.submit} type="submit" value="ダウンロード" />
                    </form>
                    <div className={styles.url}>
                        {url && <a href={url} target="_blank" rel="noopener noreferrer">ダウンロードリンクはこちら</a>}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;