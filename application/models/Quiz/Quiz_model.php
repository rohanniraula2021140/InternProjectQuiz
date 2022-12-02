<?php

class Quiz_model extends CI_Model
{

	public function __construct()
	{

		$this->load->database();
	}

	public function getQuestion($id)
	{
		// Question
		// options
		$result = array();
		$result['question'] = $this->db->where('id', $id)->get('quiz_question')->row_array();
		$result['option'] = $this->db->where('question_id', $id)->get('quiz_options')->row_array();
		return $result;
	}

	/**
	 * Array name, question_id, user_result, date_time
	 * @return void
	 */
	public function checkAnswerSubmitted($array)
	{
		return $this->db->where('name', $array['name'])->where('question_id', $array['question_id'])
				->where('date_time', $array['date_time'])->get('quiz_played')->num_rows() > 0;
	}

	public function saveAnswer($array)
	{
		if ($this->checkAnswerSubmitted($array)) {
			if ($this->db->set('user_result', $array['user_result'])->set('time_spent', $array['time_spent'])->where('name', $array['name'])->where('question_id', $array['question_id'])
				->where('date_time', $array['date_time'])->update('quiz_played')) {
				return true;
			} else {
				return false;
			}
		} else {
			if ($this->db->set('user_result', $array['user_result'])->set('time_spent', $array['time_spent'])->set('name', $array['name'])->set('question_id', $array['question_id'])
				->set('date_time', $array['date_time'])->insert('quiz_played')) {
				return true;
			} else {
				return false;
			}
		}
	}

	/**
	 * @return void
	 */
	public function getAdminReport()
	{

		$result = $this->db->query("select cqv.name, cqv.date_time, cqv.correct, sum(qp.time_spent) as total_time, count(qp.question_id) as attempted
										from quiz_played qp
										inner join (select qp.name, qp.date_time, count(qp.user_result) as correct
														from quiz_played qp
					 									inner join quiz.quiz_options qo
														on qp.question_id = qo.question_id
														where qp.user_result = qo.correct
														group by name, date_time) cqv 
										    on qp.date_time = cqv.date_time
										group by qp.name, qp.date_time");
		return $result->result_object();
	}

	public function getSinglePlayerStatus($name, $date_time){
//		 return $this->db->where('name', $name)->where('date_time', $date_time)->get('quiz_played')->result_object();
			return $this->db->select()->from('quiz_played')->join('quiz_question', 'quiz_question.id = quiz_played.question_id')->join('quiz_options', 'quiz_options.question_id = quiz_question.id')->where('name', $name)->where('date_time', $date_time)->get()->result_object();
	}

}
