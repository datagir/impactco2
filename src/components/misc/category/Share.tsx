import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { FacebookShareButton, LinkedinShareButton, TwitterShareButton, WhatsappShareButton } from 'react-share'
import { Category } from 'types/category'
import { track } from 'utils/matomo'
import { buildCurrentUrlFor } from 'utils/urls'
import ClipboardBox from 'components/base/ClipboardBox'
import { Icon } from 'components/osezchanger/icons'
import { CustomParamValue } from './CustomParam'
import CustomParams from './CustomParams'
import { Buttons, Meta } from './Share.styles'
import { buildCustomParamsUrl } from './customParamsUrl'

const Share = ({
  category,
  params,
  path,
  tracking,
}: {
  category?: Category
  params?: Record<string, CustomParamValue>
  path?: string
  tracking?: string
}) => {
  const [visibility, setVisibility] = useState<Record<string, boolean> | null>(null)

  useEffect(() => {
    if (params) {
      const values: Record<string, boolean> = {}
      Object.keys(params).forEach((key) => {
        values[key] = visibility ? visibility[key] : true
      })
      setVisibility(values)
    }
  }, [params, setVisibility])

  const url = buildCurrentUrlFor(`${path || category?.slug}?${buildCustomParamsUrl(params, visibility)}`).replace(
    /\?$/,
    ''
  )
  const trackingValue = (category ? category.name : tracking) || 'UNKNOWN'
  const trackingSlug = trackingValue.replace(/ /g, '_').toLowerCase()
  return (
    <>
      {params && visibility && (
        <CustomParams
          tracking={trackingValue}
          trackingType='Partager'
          params={params}
          visibility={visibility}
          setVisibility={setVisibility}
        />
      )}
      <ClipboardBox tracking={trackingValue}>{url}</ClipboardBox>
      <Buttons>
        <FacebookShareButton
          url={url}
          title='Partager sur facebook'
          aria-label='Partager sur facebook'
          onClick={() => track(trackingValue, 'Share Facebook', `${trackingSlug}_facebook`)}>
          <Icon iconId='facebook' />
        </FacebookShareButton>
        <TwitterShareButton
          url={url}
          title='Partager sur twitter'
          aria-label='Partager sur twitter'
          onClick={() => track(trackingValue, 'Share Twitter', `${trackingSlug}_twitter`)}>
          <Icon iconId='twitter' />
        </TwitterShareButton>
        <WhatsappShareButton
          url={url}
          title='Partager sur whatsapp'
          aria-label='Partager sur whatsapp'
          onClick={() => track(trackingValue, 'Share Whatsapp', `${trackingSlug}_whatsapp`)}>
          <Icon iconId='whatsapp' />
        </WhatsappShareButton>
        <LinkedinShareButton
          url={url}
          title='Partager sur linkedin'
          aria-label='Partager sur linkedin'
          onClick={() => track(trackingValue, 'Share Linkedin', `${trackingSlug}_linkedin`)}>
          <Icon iconId='linkedin' />
        </LinkedinShareButton>
      </Buttons>
      {category && (
        <Meta>
          <Image src={`/meta/${category.slug}.png`} width={728} height={382.2} alt='' />
          <div>
            <p>
              <b>{category.meta.title}</b>
            </p>
            <p className='text-sm'>{category.meta.description}</p>
          </div>
        </Meta>
      )}
    </>
  )
}

export default Share
