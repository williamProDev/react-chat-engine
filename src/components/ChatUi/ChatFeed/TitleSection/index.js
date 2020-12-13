import React, { Component } from 'react'

import { Row, Col } from 'react-grid-system'

import { timeSinceDate } from '../../Utilities/dateToString'

import { MenuOutlined, SettingOutlined } from '@ant-design/icons'

export default class Title extends Component {
  
    render() {
        const { chat } = this.props

        if (!chat) { return <div /> }

        return (
            <div style={{ position: 'absolute', top: '0px', width: '100%', zIndex: '1' }}>

                <Row>

                    <Col xs={2} sm={0} style={{ textAlign: 'center', padding: '32px 0px' }}>
                        <MenuOutlined style={{ color: 'rgb(24, 144, 255)' }} />
                    </Col>

                    <Col xs={8} sm={12}>

                        <div style={ styles.titleContainer }>
                        
                            <div style={ styles.titleText }>
                                { chat && chat.title }
                            </div>
                            
                            <div style={ styles.subtitleText }>
                                Active { timeSinceDate(chat.last_message.created) }
                            </div>

                        </div>

                    </Col>

                    <Col xs={2} sm={0} style={{ textAlign: 'center', padding: '32px 0px' }}>
                        <SettingOutlined style={{ color: 'rgb(24, 144, 255)' }} />
                    </Col>

                </Row>

            </div>
        );
    }
}

const styles = {
    titleContainer: {
        width: '100%',
        padding: '18px 0px',
        textAlign: 'center',
        color: 'rgb(24, 144, 255)',
        backgroundColor: 'rgb(256, 256, 256, 0.92)'
    },
    titleText: {
        fontSize: '24px',
        fontWeight: '600',
    },
    subtitleText: {
        fontSize: '12px',
    }
}
