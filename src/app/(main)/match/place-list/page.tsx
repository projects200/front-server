'use client'

import Link from 'next/link'

import SearchIcon from '@/assets/icon_search.svg'
import Typography from '@/components/ui/typography'
import Header from '@/components/commons/header'
import SITE_MAP from '@/constants/siteMap.constant'

import ListCard from './_components/listCard'
import styles from './placeList.module.css'

import { TEMP_DATA } from './tempData'

export default function PlaceList() {
  return (
    <div className={styles['container']}>
      <Header>운동장소</Header>

      <div className={styles['search-section']}>
        <Link
          href={SITE_MAP.MATCH_PLACE_REGISTER_SEARCH}
          className={styles['link-search']}
        >
          <SearchIcon className={styles['search-icon']} />
          <Typography
            className={styles['search-placeholder']}
            as="span"
            variant="content-medium"
          >
            운동하는 장소 검색
          </Typography>
        </Link>
      </div>

      <div className={styles['list-section']}>
        {TEMP_DATA.length ? (
          TEMP_DATA.map((data) => (
            <ListCard key={`list-item-${data.id}`} placeData={data} />
          ))
        ) : (
          <div className={styles['empty-section']}>
            <Typography
              as="span"
              variant="content-large"
              className={styles['empty-text']}
            >
              등록된 운동 장소가 없습니다
            </Typography>
          </div>
        )}
      </div>
    </div>
  )
}
