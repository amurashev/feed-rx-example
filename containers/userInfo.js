import React from 'react';

export default class extends React.Component {

   render() {
        var user = this.props.user;
        var dateNormal = this.props.dateNormal;

        return <div>
                    <span className="pull-left">
                        <img className="media-object img-circle user-avatar" src={user.get('avatar_small')} alt={user.get('full_name')} />
                    </span>
                    <div className="media-body">
                        <div className="media-info">
                            <span className="user-name">{user.get('full_name')}</span>
                            <span className="question-date">{dateNormal}</span>
                        </div>
                    </div>
                </div>;
    }
}