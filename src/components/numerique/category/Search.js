import React, { useContext, useEffect, useState } from 'react'
import RulesContextNumerique from '../RulesProviderNumerique'
import Wrapper from './search/Wrapper'

export default function Search(props) {
  const { engine, setSituation } = useContext(RulesContextNumerique)

  useEffect(() => {
    setSituation({
      ['streaming . durée']: 420,
      ['visio . durée']: 180,
      ['email . appareil']: `'smartphone'`,
      ['email . taille']: 0.075,
      ['streaming . appareil']: `'TV'`,
      ['visio . appareil']: `'ordinateur portable'`,
      ['visio . emplacements']: 1,
    })
  }, [])

  const [display, setDisplay] = useState(null)

  return engine ? (
    <Wrapper>
      <Wrapper.Column>
        <Wrapper.Label>
          <strong>
            {props.numberEmails} <Wrapper.Color color='#6C8CC1'>email{props.numberEmails > 1 ? 's' : ''}</Wrapper.Color>
          </strong>{' '}
          envoyé{props.numberEmails > 1 ? 's' : ''} <Wrapper.Small>par semaine</Wrapper.Small>
        </Wrapper.Label>
        <Wrapper.Parameters>
          <Wrapper.ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'email' ? null : 'email'))}
            color='#6C8CC1'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </Wrapper.ShowMore>
          <Wrapper.StyledSlider
            color='#6C8CC1'
            min={0}
            max={1500}
            value={props.numberEmails}
            onChange={props.setNumberEmails}
          />
        </Wrapper.Parameters>
        <Wrapper.Desktop $visible={display === 'email'}>
          <Wrapper.StyledSelect
            value={`'${engine.evaluate('email . appareil').nodeValue}'`}
            onChange={({ value }) => setSituation({ ['email . appareil']: value })}
            color='#6C8CC1'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
          </Wrapper.StyledSelect>
          <Wrapper.Parameters>
            <Wrapper.StyledHorizontalRadio
              name='email . transmission . émetteur . réseau'
              value={`'${engine.evaluate('email . transmission . émetteur . réseau').nodeValue}'`}
              onChange={(value) =>
                setSituation({
                  ['email . transmission . émetteur . réseau']: value,
                })
              }
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#6C8CC1'
            />
            <Wrapper.StyledSelect
              value={engine.evaluate('email . taille').nodeValue}
              onChange={({ value }) => setSituation({ ['email . taille']: value })}
              color='#6C8CC1'>
              <option value={0.075}>Sans pièce jointe</option>
              <option value={1}>Pièce jointe 1Mo</option>
              <option value={10}>Pièce jointe 5Mo</option>
            </Wrapper.StyledSelect>
          </Wrapper.Parameters>
        </Wrapper.Desktop>
      </Wrapper.Column>
      <Wrapper.Column>
        <Wrapper.Label>
          <strong>{engine.evaluate(`streaming . durée`).nodeValue / 60}h</strong> de{' '}
          <strong>
            <Wrapper.Color color='#C25166'>streaming</Wrapper.Color>
          </strong>{' '}
          <Wrapper.Small>par semaine</Wrapper.Small>
        </Wrapper.Label>
        <Wrapper.Parameters>
          <Wrapper.ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'streaming' ? null : 'streaming'))}
            color='#C25166'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </Wrapper.ShowMore>
          <Wrapper.StyledSlider
            color='#C25166'
            min={0}
            max={4200}
            step={60}
            value={engine.evaluate(`streaming . durée`).nodeValue}
            onChange={(value) =>
              setSituation({
                [`streaming . durée`]: value,
              })
            }
          />
        </Wrapper.Parameters>
        <Wrapper.Desktop $visible={display === 'streaming'}>
          <Wrapper.StyledSelect
            value={`'${engine.evaluate('streaming . appareil').nodeValue}'`}
            onChange={({ value }) => setSituation({ ['streaming . appareil']: value })}
            color='#C25166'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
            <option value={`'TV'`}>Télévision</option>
          </Wrapper.StyledSelect>
          <Wrapper.Parameters>
            <Wrapper.StyledHorizontalRadio
              name='streaming . transmission . réseau'
              value={`'${engine.evaluate('streaming . transmission . réseau').nodeValue}'`}
              onChange={(value) =>
                setSituation({
                  ['streaming . transmission . réseau']: value,
                })
              }
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#C25166'
            />
            <Wrapper.StyledSelect
              value={`'${engine.evaluate('streaming . qualité').nodeValue}'`}
              onChange={({ value }) => setSituation({ ['streaming . qualité']: value })}
              color='#C25166'>
              <option value={`'SD'`}>Basse déf</option>
              <option value={`'HD'`}>Haute Déf</option>
              <option value={`'ultra HD'`}>4K</option>
            </Wrapper.StyledSelect>
          </Wrapper.Parameters>
        </Wrapper.Desktop>
      </Wrapper.Column>
      <Wrapper.Column>
        <Wrapper.Label>
          <strong>{engine.evaluate(`visio . durée`).nodeValue / 60}h</strong> de{' '}
          <strong>
            <Wrapper.Color color='#3DC7AB'>visioconférence</Wrapper.Color>
          </strong>{' '}
          <Wrapper.Small>par semaine</Wrapper.Small>
        </Wrapper.Label>
        <Wrapper.Parameters>
          <Wrapper.ShowMore
            onClick={() => setDisplay((prevDisplay) => (prevDisplay === 'visio' ? null : 'visio'))}
            color='#3DC7AB'>
            <svg height='512' viewBox='0 0 24 24' width='512'>
              <path d='m17 5a3 3 0 1 1 3 3 3 3 0 0 1 -3-3zm-15 1h12a1 1 0 0 0 0-2h-12a1 1 0 0 0 0 2zm6 3a3 3 0 0 0 -2.82 2h-3.18a1 1 0 0 0 0 2h3.18a3 3 0 1 0 2.82-4zm14 2h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm-12 7h-8a1 1 0 0 0 0 2h8a1 1 0 0 0 0-2zm12 0h-3.18a3 3 0 1 0 0 2h3.18a1 1 0 0 0 0-2z' />
            </svg>
          </Wrapper.ShowMore>
          <Wrapper.StyledSlider
            color='#3DC7AB'
            min={0}
            max={4200}
            step={60}
            value={engine.evaluate(`visio . durée`).nodeValue}
            onChange={(value) =>
              setSituation({
                [`visio . durée`]: value,
              })
            }
          />
        </Wrapper.Parameters>
        <Wrapper.Desktop $visible={display === 'visio'}>
          <Wrapper.StyledSelect
            value={`'${engine.evaluate('visio . appareil').nodeValue}'`}
            onChange={({ value }) => setSituation({ ['visio . appareil']: value })}
            color='#3DC7AB'>
            <option value={`'smartphone'`}>Smartphone</option>
            <option value={`'tablette'`}>Tablette</option>
            <option value={`'ordinateur portable'`}>Ordinateur portable</option>
            <option value={`'ordinateur et écran'`}>Ordinateur fixe</option>
            <option value={`'TV'`}>Télévision</option>
          </Wrapper.StyledSelect>
          <Wrapper.Parameters>
            <Wrapper.StyledHorizontalRadio
              name='visio . transmission . réseau'
              value={`'${engine.evaluate('visio . transmission . réseau').nodeValue}'`}
              onChange={(value) =>
                setSituation({
                  ['visio . transmission . réseau']: value,
                })
              }
              options={[
                {
                  value: `'fixe FR'`,
                  label: `Wifi`,
                },
                {
                  value: `'mobile FR'`,
                  label: `4G`,
                },
              ]}
              color='#3DC7AB'
            />
            <Wrapper.StyledSelect
              value={`'${engine.evaluate('visio . qualité').nodeValue}'`}
              onChange={({ value }) => setSituation({ ['visio . qualité']: value })}
              color='#3DC7AB'>
              <option value={`'audio'`}>Audio</option>
              <option value={`'SD'`}>Basse déf</option>
              <option value={`'HD'`}>Haute Déf</option>
            </Wrapper.StyledSelect>
          </Wrapper.Parameters>
        </Wrapper.Desktop>
      </Wrapper.Column>
    </Wrapper>
  ) : null
}
