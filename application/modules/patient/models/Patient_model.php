<?php

class Patient_model extends CI_Model
{

	public function __construct()
	{
		$this->load->database();
	}

	public function addPatient($data)
	{
		if (isset($data['id'])) {
			$id = $data['id'];
			unset($data['id']);
			return $this->db
				->where('id', $id)
				->update('patients', $data);
		} else {
			return $this->db->insert('patients', $data);
		}
	}

	public function getPatient($type = null, $value = null)
	{
		$result = $this->db->select("pt.id, pt.firstname, pt.surname, pt.age, pt.gender, c.name as countryName , p.name as provinceName, m.name as municipalityName, pt.countryId, pt.provinceId, pt.municipalityId, pt.userLanguage, pt.address, pt.mobileNumber, pt.currentDateTime")
			->from('patients pt')
			->join('countries c', 'on pt.countryId = c.countryId')
			->join('provinces p', 'on pt.provinceId = p.provinceId')
			->join('municipalities m', 'on pt.municipalityId = m.municipalityId');

		if ($type == 'id') {
			return $result->where('id', $value)->get()->row_object();
		} else if ($type == 'num') {
			return $result->like('mobileNumber', $value)->get()->result_object();
		} else if ($type == 'text') {
			return $result->like('firstname', $value)->get()->result_object();
		} else if (is_null($type)) {
			return $result->get()->result_object();
		}
	}

}
