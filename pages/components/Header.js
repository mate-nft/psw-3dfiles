import styles from '../../styles/Home.module.css';

const Header = ({ accounts, setAccounts }) => {
    const isConnected = Boolean(accounts && accounts[0]);

    async function connectAccount() {
        if (typeof window.ethereum !== 'undefined') {
            try {
                const networkId = await window.ethereum.request({ method: 'net_version' });
                if (networkId !== '1') {
                    alert("イーサリアムネットワークに変更してください");
                    return;
                }
                const requestedAccounts = await window.ethereum.request({
                    method: "eth_requestAccounts",
                });
                setAccounts(requestedAccounts);
            } catch (error) {
                console.error("An error occurred:", error);
                alert("ウォレット接続に失敗しました");
            }
        } else {
            alert("メタマスクのインストールが必要です");
        }
    }

    return (
        <div className={styles.header}>
            {isConnected ? (
                <p className={styles.connected}>{`${accounts[0].substring(0, 4)}...${accounts[0].substring(accounts[0].length - 4)}`}</p>
            ) : (
                <button className={styles.connect} onClick={connectAccount}>ウォレット接続する</button>
            )}
        </div>
    );
}

export default Header;