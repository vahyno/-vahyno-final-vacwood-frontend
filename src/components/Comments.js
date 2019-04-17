import React, {Component} from 'react';
import { connect } from 'react-redux';

import Comment from './Comment';

class Comments extends Component {
    render(){
        const { commentIDs, classroomId } = this.props;

        return (
            <div>
                {commentIDs.map(id => (
                    <Comment
                        key={ id }
                        commentId={ id }
                        classroomId={ classroomId } 
                    />
                ))}
            </div>
        )        
    }
}

function mapStateToProps({ classrooms }, props) {
    const { classroomId} = props;
    return {
        classroomId,
        commentIDs: !classrooms[classroomId]
            ? []
            : classrooms[classroomId].comments.map(comment => comment._id),
    }
}

export default connect(mapStateToProps)(Comments);