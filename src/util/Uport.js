import { Connect, SimpleSigner, MNID } from 'uport-connect'

const uport = new Connect('React uPort IPFS DApp', {
    clientId: '2omYPjiPUiR6jyNdSZRHgbpn9PxiVqbtVsR',
    network: 'rinkeby',
    signer: SimpleSigner('ab1d56711bcf6f7ded8a8b7f768d59e8f3d3a168b75b037848aa142b93e4998f')
})

const initAccount = async () => {
    const user = await uport.requestCredentials({
        requested: ['name', 'country', 'avatar'],
        notifications: true // We want this if we want to recieve credentials
    })
    // Do something with user identity
    const decodedId = MNID.decode(user.address)
    const userAccount = decodedId.address //this is the users account  address
    console.log('contact: ', user);
    console.log('specificNetworkAddressL ', userAccount);
    return { userAccount, user }
}

const web3 = uport.getWeb3()
export { web3, uport, MNID, initAccount }