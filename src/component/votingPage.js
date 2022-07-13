import React, {useEffect, useState} from 'react'
import {View, Text, Image, TouchableOpacity} from 'react-native'
import votacaoStyles from '../styles/votacao'
import styles from '../styles/votacao'
import globalPage from '../styles/globalPage'
import { games, teams, votos } from '../pages/Login'
// import { bigInfoTeamArray } from './teamLogic'
import images from './images'

export default function VotingHome(props) {
    console.log(props)

    if(games[0] != undefined){
        let nextGame
        
        let redTeam
        let blueTeam

        let fullBlueTeam
        let fullRedTeam

        let logoAzul
        let logoVermelho
        
        let redSideContVote
        let blueSideContVote
        let voteTotal
        let blueSidePercentVote
        let redSidePercentVote
        let diaAtual = new Date()
        let index
        let idx

        const callEverything = () => {
            console.log('de', idx)
            if(props.next != '0'){
                idx = idx + parseInt(props.next)
                console.log('çe', idx, props.next)
            }
            nextGame = games[0][idx]
            console.log(nextGame, diaAtual)
            redTeam = `#GO${teams[0].find((vermelho) => {return vermelho.id_equipe == nextGame.id_equipe_2}).tag}`
            blueTeam =  `#GO${teams[0].find((azul) => {return azul.id_equipe == nextGame.id_equipe_1}).tag}`

            fullRedTeam = `${teams[0].find((vermelho) => {return vermelho.id_equipe == nextGame.id_equipe_2}).tag}`
            fullBlueTeam =  `${teams[0].find((azul) => {return azul.id_equipe == nextGame.id_equipe_1}).tag}`

            logoAzul = teams[0].find((vermelho) => {return vermelho.id_equipe == nextGame.id_equipe_1}).id_equipe
            logoVermelho =  teams[0].find((azul) => {return azul.id_equipe == nextGame.id_equipe_2}).id_equipe



            console.log(redTeam, blueTeam)
            redSideContVote = votos[0].find((partida) => {return partida.id_partida == nextGame.id_partida}).quantia_total_votos_vermelho
            blueSideContVote = votos[0].find((partida) => {return partida.id_partida == nextGame.id_partida}).quantia_total_votos_azul
            if(redSideContVote == 0 && blueSideContVote == 0){
                voteTotal = redSideContVote + blueSideContVote
                blueSidePercentVote = 50
                redSidePercentVote = 50
            }else{
                voteTotal = redSideContVote + blueSideContVote
                blueSidePercentVote = Math.round((blueSideContVote / voteTotal) * 100)
                redSidePercentVote = Math.round((redSideContVote / voteTotal) * 100)
            }

        }
            
        try{
            let arr = []
            console.log('1: ' + JSON.stringify(games))
            console.log('2: ' + JSON.stringify(games[0]))
            console.log('3: ' + JSON.stringify(games[0][0]))
            for(let i=0; i<games[0].length;i++){
                arr.push(games[0][i].data_jogo.substr(0,10).replace('-', '/').replace('-', '/'))
            }
            console.log("teste: ", arr, `${diaAtual.getFullYear()}/${diaAtual.getMonth()}/${diaAtual.getDate()}`)
            // index = findClosestPrevDate(arr, `${diaAtual.getFullYear()}/${diaAtual.getMonth()}/${diaAtual.getDate()}`)
            index = arr.map(d => Math.abs(new Date() - new Date(d).getTime()))
            idx = index.indexOf(Math.min(...index))
            console.log('VENCEDOR ' + arr[idx], games[0][(idx + props.next), arr, idx])
        }catch(error){
                console.log(error)
        }
   
        callEverything()
        if(props.identificador == '1'){
            return(
                <View style={[styles.votingView]}>
                    <View>
                        <Text style={[globalPage.whiteColor, {fontSize: 32, textAlign: 'center'}]}>Ajude a sua equipe com o seu <Text style={{color:'#ffd200', fontWeight: 'bold'}}>voto</Text>!</Text>
                        <View style={styles.mainVotingView}>
                            <View style={styles.votingCounts}>
                                <View style={styles.viewVotingCounts}>
                                    <Text style={[globalPage.whiteColor, styles.percentageVotingCount]}>{blueSidePercentVote}%</Text>
                                    <Text style={[styles.grayVotingColor]}>{blueSideContVote}</Text>
                                </View>
                                <View style={styles.viewVotingCounts}>
                                    <Text style={[styles.grayVotingColor]}>{redSideContVote}</Text>
                                    <Text style={[globalPage.whiteColor, styles.percentageVotingCount]}>{redSidePercentVote}%</Text>
                                </View>
                            </View>
                            <View style={styles.mySliderView}>
                                <View style={{borderBottomRightRadius: 0, borderTopRightRadius: 0,borderRadius: 1000, height: 30 ,width: `${blueSidePercentVote}%`,backgroundColor: '#269aff'}}>
                                </View>
                            </View>
                            <View style={styles.separateVotingTeams}>
                                <Text style={styles.percentageVotingCount}>{blueTeam}</Text>
                                <Text style={styles.percentageVotingCount}>{redTeam}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }else{
            return(
                <View style={{borderBottomColor: '#ffd200', borderBottomWidth: 1, width: '100%', flex: 1, alignItems: 'center',marginTop: 50, paddingBottom: 50}}>
                    <View style={[styles.votingView]}>
                        <Text style={{textAlign: 'center', color: '#fff', fontSize: 32, fontWeight: 'bold', position: 'absolute', marginTop: -40,marginLeft: 30}}>{fullBlueTeam}</Text><Text style={{textAlign: 'center', color: '#fff', fontSize: 32, fontWeight: 'bold', position: 'absolute', marginTop: -40, right: 40}}>{fullRedTeam}</Text>
                        <View style={votacaoStyles.votacao}>
                            <View>
                                <TouchableOpacity style={{alignItems: 'center'}}>
                                        <Image source={images(logoAzul)} style={votacaoStyles.time1}></Image>
                                        <Text style={votacaoStyles.botaoA}>Votar</Text>
                                </TouchableOpacity>
                            </View>
                            <View>
                                <Text style={votacaoStyles.vs}>VS</Text>
                            </View>
                            <View>
                                <TouchableOpacity style={{alignItems: 'center'}}>
                                        <Image source={images(logoVermelho)} style={votacaoStyles.time2}></Image>
                                        <Text style={votacaoStyles.botaoV}>Votar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View>
                            <View style={styles.mainVotingView}>
                                <View style={styles.votingCounts}>
                                    <View style={styles.viewVotingCounts}>
                                        <Text style={[globalPage.whiteColor, styles.percentageVotingCount]}>{blueSidePercentVote}%</Text>
                                        <Text style={[styles.grayVotingColor]}>{blueSideContVote}</Text>
                                    </View>
                                    <View style={styles.viewVotingCounts}>
                                        <Text style={[styles.grayVotingColor]}>{redSideContVote}</Text>
                                        <Text style={[globalPage.whiteColor, styles.percentageVotingCount]}>{redSidePercentVote}%</Text>
                                    </View>
                                </View>
                                <View style={styles.mySliderView}>
                                    <View style={{borderBottomRightRadius: 0, borderTopRightRadius: 0,borderRadius: 1000, height: 30 ,width: `${blueSidePercentVote}%`,backgroundColor: '#269aff'}}>
                                    </View>
                                </View>
                                <View style={styles.separateVotingTeams}>
                                    <Text style={styles.percentageVotingCount}>{blueTeam}</Text>
                                    <Text style={styles.percentageVotingCount}>{redTeam}</Text>
                                </View>
                            </View>
                        </View>
                    </View>
                </View>
            )
        }
    }else{
        return(<View></View>)
    }


}