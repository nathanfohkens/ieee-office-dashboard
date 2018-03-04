import React from 'react'
import { withStyles } from 'material-ui/styles'
import Slider from 'react-slick'
import { flexAlign, card } from '../../../styles'


const styles = theme => ({
  root: {
    height: '650px',
    ...flexAlign.centerHorVert,

  },
  item: {
    ...flexAlign.centerHorVert,
    backgroundColor: '#222',
    margin: '24px',
    width: '95%',
    height: '90%',
    flexDirection: 'column',
    boxShadow: card.boxShadow,
  },
  imgContainer: {
    flex: '1 90%',
    ...flexAlign.centerHorVert
  },
  caption: {
    flex: '1 10%',
    color: '#fff',
    fontSize: '2.5em',
    fontWeight: 'bold'
  },
  img: {
    maxWidth: '90%',
    maxHeight: '100%',
  }
})

const GalleryCard = ({ classes, card, onRefreshClick }) => {
  const sliderSettings = {
    arrows: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 100000,
  }
  const cardData = card.data || []
  return (
    <div>
      <Slider {...sliderSettings}>
        {
          (cardData).map(({ src, caption }, ind) => {
            return (
              <div key={`event-${ind}`}>
                <div className={classes.root}>
                  <div className={classes.item}>
                    <div className={classes.imgContainer}>
                      <img className={classes.img} src={src} alt={src} />
                    </div>
                    <div className={classes.caption}>
                      {caption || 'IEEE Carleton Event'}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </Slider>
    </div>
  )
}

export default withStyles(styles)(GalleryCard);
