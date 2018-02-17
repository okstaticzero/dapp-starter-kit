import { Connect, SimpleSigner, MNID } from 'uport-connect'

const uport = new Connect('React uPort IPFS DApp', {
    clientId: '2omYPjiPUiR6jyNdSZRHgbpn9PxiVqbtVsR',
    network: 'rinkeby',
    signer: SimpleSigner('ab1d56711bcf6f7ded8a8b7f768d59e8f3d3a168b75b037848aa142b93e4998f')
})
console.log('Uport 111: ', uport);

const initAccount = async () => {
    const user = await uport.requestCredentials({
        requested: ['name', 'country', 'avatar', 'Relationship', "specialUser", "xxxx_test"],
        notifications: true // We want this if we want to recieve credentials
    })
    // Do something with user identity
    const decodedId = MNID.decode(user.address)
    const userAccount = decodedId.address //this is the users account  address
    console.log('contact: ', user);
    console.log('specificNetworkAddressL ', userAccount);
    return { userAccount, user }
}

// Attest specific credentials
export const attestCredentials = async (receiving_address) => {
    console.log('receiving_address: ', receiving_address);

    uport.attestCredentials({
        sub: receiving_address,
        claim: { specialUser: "verified" },
        exp: new Date().getTime() + 30 * 24 * 60 * 60 * 1000,  // 30 days from now
        uriHandler: (log) => { console.log(log) }
    })
}

const web3 = uport.getWeb3()
export { web3, uport, MNID, initAccount }