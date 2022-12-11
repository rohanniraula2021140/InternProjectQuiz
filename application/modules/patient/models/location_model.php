<?php

class location_model extends CI_Model
{

	public function __construct()
	{
		$this->load->database();
	}

	public function getLocations($type = null, $id = null)
	{
		if (is_null($type)) {

		} else if ($type == "provinces") {
			return $this->db->where('countryId', $id)->get('provinces')->result_object();
		} else if ($type == "municipalities") {
			return $this->db->where('provinceId', $id)->get('municipalities')->result_object();
		} else if ($type == "countries") {
			return $this->db->get('countries')->result_object();
		}
	}

}
