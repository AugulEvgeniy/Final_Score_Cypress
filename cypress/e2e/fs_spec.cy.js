describe('template spec', () => {
  it('passes', () => {
    cy.visit('http://highlight.spinberry.com/applepen/HG_FinalScore/index.html?go=dev&serverAddress=https://riw-dev.olsworth.com&productId=finalscoreitaly85-dev&token=123456&currency=GBP&lang=en&testConfig=local&forceDevice=tablet&hideCurrency=false', { timeout: 30000} )

    cy.window({ timeout: 40000 }).should((win) => {
        const start_button = win.game.scene.scenes[2].container.list[0].list[6].list[0].visible
        expect(start_button, 'Game is loaded').to.be.true
    })

    cy.window().then((win) => {
        win.game.scene.scenes[2].container.list[0].list[6].list[2].emit('pointerdown')
    })
    
  cy.intercept('infopass').as('infopass');
  cy.wait('@infopass', { timeout: 40000 }).then((interception) => {

  cy.window().should((win) => {
    const passThruData = interception.response.body.passThruData
    const right_team = win.game.scene.scenes[1].gameContainer.teamsPanel.teamRightTxt.text;
    const left_team = win.game.scene.scenes[1].gameContainer.teamsPanel.teamLeftTxt.text;
    const marketButtons = win.game.scene.scenes[1].gameContainer.stakeSelector.MarketButtons

    expect(right_team, 'right team corresponds to the infopass').to.include(passThruData.teams[1].code);
    expect(left_team, 'left team corresponds to the infopass').to.include(passThruData.teams[0].code);
    expect(marketButtons.MATCHRESULT[0].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[0].price)
    expect(marketButtons.MATCHRESULT[1].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[1].price)
    expect(marketButtons.MATCHRESULT[2].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[2].price)
    expect(marketButtons.UNDEROVER2POINT5TOTALGOALS[0].text, 'under over market values correspond to the response').to.include(passThruData.markets[1].selections[0].price)
    expect(marketButtons.UNDEROVER2POINT5TOTALGOALS[1].text, 'under over market values correspond to the response').to.include(passThruData.markets[1].selections[1].price)
    expect(marketButtons.BOTHTEAMSTOSCORE[0].text, 'both teams market values correspond to the response').to.include(passThruData.markets[2].selections[0].price)
    expect(marketButtons.BOTHTEAMSTOSCORE[1].text, 'both teams market values correspond to the response').to.include(passThruData.markets[2].selections[1].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[0].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[0].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[1].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[1].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[2].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[2].price)
  });
  })
  
  cy.wait(300)
  cy.window().then((win) => {
    win.game.scene.scenes[1].gameContainer.teamsPanel.list[1].list[2].emit('pointerdown');
  });

  cy.wait('@infopass', { timeout: 40000 }).then((interception) => {

  cy.window().should((win) => {
    const passThruData = interception.response.body.passThruData
    const right_team = win.game.scene.scenes[1].gameContainer.teamsPanel.teamRightTxt.text;
    const left_team = win.game.scene.scenes[1].gameContainer.teamsPanel.teamLeftTxt.text;
    const marketButtons = win.game.scene.scenes[1].gameContainer.stakeSelector.MarketButtons

    expect(right_team, 'right team corresponds to the infopass').to.include(passThruData.teams[1].code);
    expect(left_team, 'left team corresponds to the infopass').to.include(passThruData.teams[0].code);
    expect(marketButtons.MATCHRESULT[0].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[0].price)
    expect(marketButtons.MATCHRESULT[1].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[1].price)
    expect(marketButtons.MATCHRESULT[2].text, 'match result market values correspond to the response').to.include(passThruData.markets[0].selections[2].price)
    expect(marketButtons.UNDEROVER2POINT5TOTALGOALS[0].text, 'under over market values correspond to the response').to.include(passThruData.markets[1].selections[0].price)
    expect(marketButtons.UNDEROVER2POINT5TOTALGOALS[1].text, 'under over market values correspond to the response').to.include(passThruData.markets[1].selections[1].price)
    expect(marketButtons.BOTHTEAMSTOSCORE[0].text, 'both teams market values correspond to the response').to.include(passThruData.markets[2].selections[0].price)
    expect(marketButtons.BOTHTEAMSTOSCORE[1].text, 'both teams market values correspond to the response').to.include(passThruData.markets[2].selections[1].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[0].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[0].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[1].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[1].price)
    expect(marketButtons.FIRSTTEAMTOSCORE[2].text, 'first team to score market values correspond to the response').to.include(passThruData.markets[3].selections[2].price)
  });
  })

  cy.window().then((win) => {
    win.game.scene.scenes[1].gameContainer.stakeSelector.list[1].list[1].list[5].emit('pointerdown')
  })

  cy.intercept('playgame').as('playgame');

  cy.wait('@playgame', { timeout: 40000 }).then((interception) => {
    const scores = interception.response.body.gameResult.integrationResultData.scores
    const teams = interception.response.body.gameResult.integrationResultData.teams
    const state = interception.response.body.gameResult.integrationResultData.state
    const winPence = interception.response.body.gameResult.integrationResultData.winPence

  function clickUntilTurboMode(win, maxAttempts = 50, interval = 100) {
  if (maxAttempts <= 0) {
    throw new Error('Turbo mode did not become true after maximum attempts');
  }

  if (win.game.scene.scenes[1].gameContainer.videoPopup.turboMode) {
    return;
  }

  win.game.scene.scenes[1].gameContainer.videoPopup.turboButton.emit('pointerdown');
  
  cy.wait(interval).then(() => {
    clickUntilTurboMode(win, maxAttempts - 1, interval);
  });
  }

  cy.window().then((win) => {
    clickUntilTurboMode(win);
  });

  cy.window({ timeout: 40000 }).should((win) => {
    const resultBanner = win.game.scene.scenes[1].gameContainer.reBetPopup.visible
    expect(resultBanner, 'result banner is displayed').to.be.true
  })

  cy.window({ timeout: 5000 }).should((win) => {
    const rebetPopup = win.game.scene.scenes[1].gameContainer.reBetPopup
    expect(rebetPopup.list[11].text, 'left score corresponds to the response').to.include(scores[0])
    expect(rebetPopup.list[12].text, 'right score corresponds to the response').to.include(scores[1])
    expect(rebetPopup.list[8].text, 'left team corresponds to the response').to.include(teams[0].code)
    expect(rebetPopup.list[4].text, 'right team corresponds to the response').to.include(teams[1].code)
  })

if (state === "WIN") {
    cy.window({ timeout: 5000 }).should((win) => {
        const winnings = win.game.scene.scenes[1].gameContainer.reBetPopup.list[1].text;
        
        // Create flexible matching patterns
        const expectedAmount = winPence / 100;
        const possibleFormats = [
            `YOU'VE WON £ ${expectedAmount.toFixed(2)}`,  // £ 1.00
            `YOU'VE WON £ ${expectedAmount}`,            // £ 1 (if no decimals)
        ];

        const matchFound = possibleFormats.some(format => winnings.includes(format));
        
        expect(matchFound, `Win value ${expectedAmount} corresponds to the response: "${winnings}"`)
            .to.be.true;
    });
} else {
    cy.window({ timeout: 5000 }).should((win) => {
      const lose = win.game.scene.scenes[1].gameContainer.reBetPopup.list[1].text
      expect(lose, 'Lose message is displayed').to.include("YOU'VE LOST")
  })
}
})
})
})