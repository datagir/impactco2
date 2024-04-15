import classNames from 'classnames'
import React from 'react'
import styles from './Logo.module.css'

const Logo = ({
  right,
  url,
  value,
  onClick,
}: {
  right?: boolean
  url?: string
  value: number
  onClick?: () => void
}) => {
  return (
    <a
      href={url || `https://impactco2.fr/comparateur?value=${value / 1000}`}
      onClick={onClick}
      className={classNames(right ? styles.reverseLogo : styles.logo)}
      target='_blank'
      rel='noreferrer noopener'
      aria-label='Logo Impact CO2'>
      <svg xmlns='http://www.w3.org/2000/svg' width='30' height='50' viewBox='0 0 30 50' fill='none'>
        <path
          fillRule='evenodd'
          clipRule='evenodd'
          d='M30 0.854095V30.8541H0V0.854095H30ZM11.4943 2.28267H28.5714V19.3496C27.5766 18.8719 26.4617 18.6042 25.2843 18.6042C24.7054 18.6042 24.1415 18.6689 23.5996 18.7915C23.9141 17.8694 24.0848 16.8806 24.0848 15.8519C24.0848 10.825 20.0096 6.74983 14.9827 6.74983C13.954 6.74983 12.9652 6.92046 12.0431 7.23496C12.1656 6.69307 12.2304 6.12923 12.2304 5.55027C12.2304 4.38058 11.9662 3.27258 11.4943 2.28267ZM1.42857 9.97567V2.28267H9.00221C9.68383 3.19377 10.0875 4.32488 10.0875 5.55027C10.0875 8.56579 7.64294 11.0103 4.62742 11.0103C3.43267 11.0103 2.32754 10.6266 1.42857 9.97567ZM1.42857 12.4495V29.4255H18.3942C17.9369 28.4482 17.6814 27.3575 17.6814 26.2072C17.6814 25.6145 17.7492 25.0377 17.8775 24.484C16.9681 24.7889 15.9947 24.954 14.9827 24.954C9.95571 24.954 5.88056 20.8789 5.88056 15.8519C5.88056 14.8399 6.04572 13.8665 6.35056 12.9571C5.79691 13.0854 5.22009 13.1532 4.62742 13.1532C3.48474 13.1532 2.40093 12.9011 1.42857 12.4495ZM20.8731 29.4255H28.5714V21.847C27.657 21.1566 26.5185 20.7471 25.2843 20.7471C22.2688 20.7471 19.8243 23.1917 19.8243 26.2072C19.8243 27.4106 20.2136 28.5231 20.8731 29.4255Z'
          fill='currentcolor'
        />
        <path d='M0.266357 39.0685V32.8541H1.52699V39.0685H0.266357Z' fill='currentcolor' />
        <path
          d='M3.11305 39.0685V34.5941H4.24052V34.9315C4.54236 34.6385 4.9241 34.4166 5.47452 34.4166C6.04269 34.4166 6.53985 34.6652 6.83281 35.1446C7.15241 34.7539 7.57854 34.4166 8.33315 34.4166C9.25643 34.4166 9.9844 35.0558 9.9844 36.3164V39.0685H8.84805V36.3608C8.84805 35.8193 8.55509 35.4819 8.04906 35.4819C7.56078 35.4819 7.29445 35.8193 7.1169 36.1211C7.12578 36.1833 7.12578 36.2454 7.12578 36.3164V39.0685H5.98943V36.3608C5.98943 35.8193 5.69646 35.4819 5.19043 35.4819C4.67553 35.4819 4.4092 35.8637 4.24052 36.1478V39.0685H3.11305Z'
          fill='currentcolor'
        />
        <path
          d='M11.2712 41.2525V34.5941H12.3987V34.9581C12.7449 34.6119 13.1799 34.4166 13.7924 34.4166C15.2129 34.4166 16.0651 35.5263 16.0651 36.8313C16.0651 38.1364 15.2129 39.2461 13.7924 39.2461C13.1799 39.2461 12.7449 39.0508 12.3987 38.7046V41.2525H11.2712ZM13.6327 35.4819C13.1089 35.4819 12.6827 35.7127 12.3987 36.13V37.5327C12.7005 37.9588 13.1177 38.1808 13.6327 38.1808C14.3961 38.1808 14.8933 37.6126 14.8933 36.8313C14.8933 36.0501 14.3961 35.4819 13.6327 35.4819Z'
          fill='currentcolor'
        />
        <path
          d='M18.2538 39.2017C17.3571 39.2017 16.7446 38.6868 16.7446 37.8612C16.7446 37.1865 17.2684 36.6804 18.2271 36.5206L19.5943 36.2898V36.1744C19.5943 35.7039 19.2392 35.402 18.7243 35.402C18.2893 35.402 17.9519 35.6062 17.7122 35.9347L16.8866 35.3044C17.2861 34.7539 17.9431 34.4166 18.7598 34.4166C20.056 34.4166 20.7218 35.189 20.7218 36.1744V39.0685H19.5943V38.6335C19.3102 38.9798 18.7776 39.2017 18.2538 39.2017ZM17.8632 37.8079C17.8632 38.1097 18.1029 38.3051 18.4846 38.3051C18.9995 38.3051 19.3724 38.0654 19.5943 37.7102V37.0799L18.529 37.2575C18.0585 37.3374 17.8632 37.5327 17.8632 37.8079Z'
          fill='currentcolor'
        />
        <path
          d='M24.1613 38.1808C24.6052 38.1808 24.9603 37.9766 25.1733 37.6659L26.0522 38.3406C25.635 38.891 24.978 39.2461 24.1613 39.2461C22.6165 39.2461 21.6933 38.1364 21.6933 36.8313C21.6933 35.5263 22.6165 34.4166 24.1613 34.4166C24.978 34.4166 25.635 34.7717 26.0522 35.3221L25.1733 35.9968C24.9603 35.6861 24.6052 35.4819 24.1435 35.4819C23.4067 35.4819 22.8651 36.0501 22.8651 36.8313C22.8651 37.6215 23.4067 38.1808 24.1613 38.1808Z'
          fill='currentcolor'
        />
        <path
          d='M27.2213 37.435V35.6062H26.3868V34.5941H27.2213V33.4755H28.3576V34.5941H29.7248V35.6062H28.3576V37.435C28.3576 37.9322 28.624 38.1275 29.0679 38.1275C29.3786 38.1275 29.5828 38.092 29.7337 38.0298V39.0153C29.5118 39.1129 29.2454 39.1573 28.8726 39.1573C27.754 39.1573 27.2213 38.527 27.2213 37.435Z'
          fill='currentcolor'
        />
        <path
          d='M3.73269 46.9432C4.44291 46.9432 5.00221 46.597 5.35732 46.091L6.35162 46.8545C5.78345 47.6268 4.86016 48.124 3.73269 48.124C1.77072 48.124 0.430183 46.6148 0.430183 44.8392C0.430183 43.0636 1.77072 41.5544 3.73269 41.5544C4.86016 41.5544 5.78345 42.0605 6.35162 42.8151L5.35732 43.5874C5.00221 43.0814 4.44291 42.7352 3.73269 42.7352C2.56084 42.7352 1.72633 43.6496 1.72633 44.8392C1.72633 46.0288 2.56084 46.9432 3.73269 46.9432Z'
          fill='currentcolor'
        />
        <path
          d='M10.2609 41.5544C12.214 41.5544 13.5546 43.0636 13.5546 44.8392C13.5546 46.6148 12.214 48.124 10.2609 48.124C8.29896 48.124 6.95842 46.6148 6.95842 44.8392C6.95842 43.0636 8.29896 41.5544 10.2609 41.5544ZM10.2609 46.9432C11.4239 46.9432 12.2584 46.0288 12.2584 44.8392C12.2584 43.6496 11.4239 42.7352 10.2609 42.7352C9.08908 42.7352 8.25457 43.6496 8.25457 44.8392C8.25457 46.0288 9.08908 46.9432 10.2609 46.9432Z'
          fill='currentcolor'
        />
        <path
          d='M14.3189 49.1449V48.3726L15.6328 47.103C15.7838 46.9432 16.0323 46.739 16.0323 46.4106C16.0323 46.1354 15.8459 45.9756 15.5796 45.9756C15.2422 45.9756 15.038 46.2064 14.8427 46.5349L14.1591 46.1087C14.4876 45.5761 14.9226 45.2209 15.624 45.2209C16.3608 45.2209 16.9023 45.656 16.9023 46.3218C16.9023 46.89 16.5472 47.2628 16.2188 47.5736L15.3754 48.3726H17V49.1449H14.3189Z'
          fill='currentcolor'
        />
      </svg>
    </a>
  )
}

export default Logo
